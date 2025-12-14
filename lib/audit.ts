import fs from 'fs'
import path from 'path'

/**
 * Audit logging for admin actions
 * Logs to a file outside public_html for security
 */

// Truncate IP address for privacy (e.g., 192.168.1.100 -> 192.168.1.xxx)
export function truncateIP(ip: string): string {
  if (!ip || ip === 'unknown') return 'unknown'
  
  // Handle IPv4
  const ipv4Match = ip.match(/^(\d{1,3}\.\d{1,3}\.\d{1,3})\.\d{1,3}/)
  if (ipv4Match) {
    return `${ipv4Match[1]}.xxx`
  }
  
  // Handle IPv6 (truncate last segment)
  if (ip.includes(':')) {
    const parts = ip.split(':')
    if (parts.length > 1) {
      parts[parts.length - 1] = 'xxxx'
      return parts.join(':')
    }
  }
  
  return 'unknown'
}

// Get audit log file path (outside public_html, in .logs directory)
function getAuditLogPath(): string {
  const logsDir = path.join(process.cwd(), '.logs')
  
  // Create .logs directory if it doesn't exist
  if (!fs.existsSync(logsDir)) {
    try {
      fs.mkdirSync(logsDir, { recursive: true, mode: 0o700 }) // 700 = owner read/write/execute only
    } catch (error) {
      console.error('[AUDIT] Failed to create logs directory:', error)
      // Fallback to project root if .logs can't be created
      return path.join(process.cwd(), 'audit.log')
    }
  }
  
  return path.join(logsDir, 'audit.log')
}

export interface AuditLogEntry {
  timestamp: string
  action: string
  ip: string
  truncatedIP: string
  details?: string
  success: boolean
}

/**
 * Log an admin action to the audit log file
 * 
 * @param action - The action performed (e.g., "LOGIN", "CREATE_RECIPE", "DELETE_RECIPE")
 * @param ip - The IP address of the requester
 * @param success - Whether the action was successful
 * @param details - Optional additional details about the action
 */
export function logAdminAction(
  action: string,
  ip: string,
  success: boolean,
  details?: string
): void {
  try {
    const truncatedIP = truncateIP(ip)
    const timestamp = new Date().toISOString()
    
    const logEntry: AuditLogEntry = {
      timestamp,
      action,
      ip: truncatedIP, // Store truncated IP in log
      truncatedIP, // For consistency
      details: details || undefined,
      success,
    }
    
    // Format log line: [TIMESTAMP] ACTION | IP: xxx.xxx.xxx.xxx | SUCCESS/FAILED | DETAILS
    const logLine = [
      `[${timestamp}]`,
      action,
      `| IP: ${truncatedIP}`,
      `| ${success ? 'SUCCESS' : 'FAILED'}`,
      details ? `| ${details}` : '',
    ]
      .filter(Boolean)
      .join(' ')
    
    const logPath = getAuditLogPath()
    
    // Append to log file (create if doesn't exist)
    fs.appendFileSync(logPath, logLine + '\n', { encoding: 'utf8', mode: 0o600 }) // 600 = owner read/write only
    
    // Also log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[AUDIT]', logLine)
    }
  } catch (error) {
    // Don't throw - audit logging should never break the application
    console.error('[AUDIT] Failed to write audit log:', error)
  }
}

/**
 * Get recent audit log entries (for admin review)
 * 
 * @param limit - Maximum number of entries to return (default: 100)
 * @returns Array of log entries
 */
export function getAuditLogs(limit: number = 100): string[] {
  try {
    const logPath = getAuditLogPath()
    
    if (!fs.existsSync(logPath)) {
      return []
    }
    
    const logContent = fs.readFileSync(logPath, 'utf8')
    const lines = logContent.split('\n').filter(line => line.trim())
    
    // Return last N lines (most recent first)
    return lines.slice(-limit).reverse()
  } catch (error) {
    console.error('[AUDIT] Failed to read audit log:', error)
    return []
  }
}

