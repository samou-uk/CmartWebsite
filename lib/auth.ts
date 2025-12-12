import { cookies } from 'next/headers'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import fs from 'fs'
import path from 'path'

const SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 hours

// Helper function to get password hash
// Tries multiple sources: config file, then environment variable
function getPasswordHash(): string {
  // First, try reading from config file (more reliable for hashes with special chars)
  // Located in .config/ directory (hidden, not web-accessible)
  try {
    const configPath = path.join(process.cwd(), '.config', 'admin.json')
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
      if (config.passwordHash) {
        return config.passwordHash.trim()
      }
    }
  } catch (error) {
    // Config file doesn't exist or is invalid, fall back to env var
  }
  
  // Fallback to environment variable
  const hash = process.env.ADMIN_PASSWORD_HASH || ''
  // Remove surrounding quotes if present (common in .env files)
  const cleaned = hash.replace(/^['"]|['"]$/g, '').trim()
  
  // Debug: Log if hash seems truncated (should be 60 chars for bcrypt)
  if (cleaned && cleaned.length < 59) {
    console.warn(`[AUTH] Password hash appears truncated: length=${cleaned.length}, starts with: ${cleaned.substring(0, 10)}`)
  }
  
  return cleaned
}

// Helper function to get legacy secret (reads from env at runtime)
function getLegacySecret(): string {
  const secret = process.env.ADMIN_SECRET || ''
  // Remove surrounding quotes if present (common in .env files)
  return secret.replace(/^['"]|['"]$/g, '').trim()
}

export interface SessionData {
  authenticated: boolean
  expiresAt: number
}

export function createSession(): string {
  const expiresAt = Date.now() + SESSION_DURATION
  const sessionData: SessionData = {
    authenticated: true,
    expiresAt,
  }
  
  // Return JSON stringified session data
  return JSON.stringify(sessionData)
}

export function validateSession(sessionData: string | null | undefined): boolean {
  if (!sessionData) return false
  
  try {
    const session: SessionData = JSON.parse(sessionData)
    
    // Check if session is expired
    if (Date.now() > session.expiresAt) {
      return false
    }
    
    return session.authenticated === true
  } catch {
    return false
  }
}

export async function getSession(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('admin_session')
    
    if (!sessionCookie) return false
    
    return validateSession(sessionCookie.value)
  } catch {
    return false
  }
}

export async function verifyPassword(password: string): Promise<boolean> {
  // Read environment variables at runtime (not at module load time)
  const passwordHash = getPasswordHash()
  const legacySecret = getLegacySecret()
  
  // Try bcrypt hash first (new method)
  if (passwordHash) {
    try {
      // Check if it's a valid bcrypt hash (starts with $2a$, $2b$, or $2y$)
      // bcrypt hashes are 60 characters and start with $2[ayb]$ followed by cost and hash
      const isValidFormat = passwordHash.match(/^\$2[ayb]\$\d{2}\$/)
      if (isValidFormat) {
        // Try to compare - bcrypt.compare will handle the actual validation
        return await bcrypt.compare(password, passwordHash)
      } else {
        console.error('Invalid bcrypt hash format.')
        console.error('Hash received:', passwordHash.substring(0, 20) + '...')
        console.error('Hash length:', passwordHash.length)
        console.error('Expected format: $2a$12$... or $2b$12$... or $2y$12$... (60 characters)')
      }
    } catch (error) {
      console.error('Password verification error:', error)
      return false
    }
  }
  
  // Fallback to legacy plain text comparison (for backward compatibility)
  // This allows migration without breaking existing setups
  if (legacySecret) {
    console.warn('Using legacy ADMIN_SECRET. Please migrate to ADMIN_PASSWORD_HASH with bcrypt.')
    return password === legacySecret
  }
  
  console.error('Neither ADMIN_PASSWORD_HASH nor ADMIN_SECRET is set')
  console.error('Current env check - ADMIN_PASSWORD_HASH:', passwordHash ? `SET (length: ${passwordHash.length})` : 'NOT SET')
  console.error('Current env check - ADMIN_SECRET:', legacySecret ? 'SET' : 'NOT SET')
  return false
}

// Helper function to hash a password (for initial setup)
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12 // Higher rounds = more secure but slower
  return await bcrypt.hash(password, saltRounds)
}

// Rate limiting storage (in production, use Redis or database)
const loginAttempts = new Map<string, { count: number; resetAt: number }>()

export function checkRateLimit(identifier: string): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now()
  const maxAttempts = 5
  const windowMs = 15 * 60 * 1000 // 15 minutes
  
  const attempts = loginAttempts.get(identifier)
  
  if (!attempts || now > attempts.resetAt) {
    // Reset window
    loginAttempts.set(identifier, {
      count: 1,
      resetAt: now + windowMs,
    })
    return { allowed: true, remaining: maxAttempts - 1, resetAt: now + windowMs }
  }
  
  if (attempts.count >= maxAttempts) {
    return { allowed: false, remaining: 0, resetAt: attempts.resetAt }
  }
  
  attempts.count++
  loginAttempts.set(identifier, attempts)
  
  return {
    allowed: true,
    remaining: maxAttempts - attempts.count,
    resetAt: attempts.resetAt,
  }
}

export function clearRateLimit(identifier: string) {
  loginAttempts.delete(identifier)
}

