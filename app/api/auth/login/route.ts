import { NextRequest, NextResponse } from 'next/server'
import { verifyPassword, createSession, checkRateLimit, clearRateLimit } from '@/lib/auth'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    
    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      )
    }

    // Get client identifier for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'
    const identifier = `login:${ip}`

    // Check rate limit
    const rateLimit = checkRateLimit(identifier)
    if (!rateLimit.allowed) {
      const resetIn = Math.ceil((rateLimit.resetAt - Date.now()) / 1000 / 60)
      return NextResponse.json(
        { 
          error: 'Too many login attempts', 
          message: `Please try again in ${resetIn} minutes`,
          resetAt: rateLimit.resetAt
        },
        { status: 429 }
      )
    }

    // Verify password
    const isValidPassword = await verifyPassword(password)
    if (!isValidPassword) {
      return NextResponse.json(
        { 
          error: 'Invalid password',
          remaining: rateLimit.remaining
        },
        { status: 401 }
      )
    }

    // Clear rate limit on successful login
    clearRateLimit(identifier)

    // Create session
    const sessionData = createSession()
    const sessionId = crypto.randomBytes(32).toString('hex')
    
    // Create response with httpOnly cookie
    const response = NextResponse.json({ 
      success: true,
      message: 'Login successful'
    })

    // Set httpOnly cookie (secure, sameSite for production)
    response.cookies.set('admin_session', sessionData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

