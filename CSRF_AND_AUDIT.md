# CSRF Protection & Audit Logging

## Overview

This document describes the CSRF token protection and audit logging system implemented for the recipe management admin interface.

---

## CSRF Token Protection

### How It Works

1. **Token Generation**: On successful login, a CSRF token is generated and stored in two places:
   - **httpOnly Cookie**: `csrf_token` (for server-side validation)
   - **Login Response**: Token returned to client (stored in React state)

2. **Token Validation**: For all state-changing requests (POST, PUT, DELETE), the server:
   - Reads the CSRF token from the `X-CSRF-Token` header
   - Compares it with the token stored in the `csrf_token` cookie
   - Uses timing-safe comparison to prevent timing attacks
   - Rejects requests with invalid or missing tokens (403 Forbidden)

3. **Token Expiration**: CSRF tokens expire after 24 hours (same as session)

### Protected Endpoints

All state-changing operations require valid CSRF tokens:
- `POST /api/recipes` - Create recipe
- `PUT /api/recipes` - Update recipe
- `DELETE /api/recipes` - Delete recipe
- `POST /api/upload` - Upload file

### Implementation Details

**Server-Side** (`lib/auth.ts`):
```typescript
export function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

export function validateCSRFToken(token: string, storedToken: string | null): boolean {
  if (!token || !storedToken) return false
  return crypto.timingSafeEqual(
    Buffer.from(token),
    Buffer.from(storedToken)
  )
}
```

**Client-Side** (`app/admin-vJWIU8yIa8OU4IEVVrOE/recipes/page.tsx`):
- CSRF token stored in React state after login
- Token sent in `X-CSRF-Token` header for all POST/PUT/DELETE requests
- Token cleared on logout

### Security Benefits

- ✅ Prevents Cross-Site Request Forgery (CSRF) attacks
- ✅ Works alongside SameSite: strict cookies for defense in depth
- ✅ Timing-safe comparison prevents timing attacks
- ✅ Token stored in httpOnly cookie (can't be accessed via XSS)

---

## Audit Logging

### Log File Location

Audit logs are stored in: **`.logs/audit.log`** (outside `public_html`)

**File Permissions**: 
- Directory: `700` (owner read/write/execute only)
- File: `600` (owner read/write only)

### IP Address Truncation

For privacy, IP addresses are truncated:
- **IPv4**: `192.168.1.100` → `192.168.1.xxx`
- **IPv6**: `2001:0db8:85a3::8a2e:0370:7334` → `2001:0db8:85a3::xxxx`
- **Unknown**: `unknown`

### Logged Actions

All admin actions are logged with:
- **Timestamp**: ISO 8601 format
- **Action**: Action type (e.g., `LOGIN`, `CREATE_RECIPE`, `DELETE_RECIPE`)
- **IP Address**: Truncated for privacy
- **Success/Failure**: Whether the action succeeded
- **Details**: Additional context (recipe slug, filename, error messages, etc.)

### Logged Events

#### Authentication
- `LOGIN` - Successful login
- `LOGIN_ATTEMPT` - Failed login attempt (with remaining attempts)
- `LOGOUT` - Admin logout

#### Recipe Management
- `CREATE_RECIPE` - Recipe creation (with recipe slug and ID)
- `UPDATE_RECIPE` - Recipe update (with recipe slug and ID)
- `DELETE_RECIPE` - Recipe deletion (with recipe slug)

#### File Operations
- `UPLOAD_FILE` - File upload (with filename and size)

### Log Format

```
[TIMESTAMP] ACTION | IP: xxx.xxx.xxx.xxx | SUCCESS/FAILED | DETAILS
```

**Example Log Entries**:
```
[2024-12-12T20:39:17.214Z] LOGIN | IP: 192.168.1.xxx | SUCCESS | Admin login successful
[2024-12-12T20:40:05.123Z] CREATE_RECIPE | IP: 192.168.1.xxx | SUCCESS | Created recipe: classic-pad-thai (ID: 1)
[2024-12-12T20:41:22.456Z] UPLOAD_FILE | IP: 192.168.1.xxx | SUCCESS | Uploaded: 1703123456789-recipe.jpg (245.67KB)
[2024-12-12T20:42:10.789Z] DELETE_RECIPE | IP: 192.168.1.xxx | SUCCESS | Deleted recipe: old-recipe
[2024-12-12T20:43:15.012Z] LOGIN_ATTEMPT | IP: 192.168.1.xxx | FAILED | Failed login attempt (4 attempts remaining)
[2024-12-12T20:44:20.345Z] UPDATE_RECIPE | IP: 192.168.1.xxx | FAILED | Invalid CSRF token
```

### Implementation

**Logging Function** (`lib/audit.ts`):
```typescript
export function logAdminAction(
  action: string,
  ip: string,
  success: boolean,
  details?: string
): void
```

**Usage Example**:
```typescript
logAdminAction('CREATE_RECIPE', ip, true, `Created recipe: ${recipe.slug} (ID: ${recipe.id})`)
logAdminAction('LOGIN_ATTEMPT', ip, false, `Failed login attempt (${remaining} attempts remaining)`)
```

### Reading Audit Logs

**Programmatically**:
```typescript
import { getAuditLogs } from '@/lib/audit'

const logs = getAuditLogs(100) // Get last 100 entries
```

**Manually**:
- Logs are stored in `.logs/audit.log`
- Can be viewed via SSH or cPanel File Manager
- Logs are appended (not overwritten)

### Security Considerations

1. **File Location**: Logs stored outside `public_html` (not web-accessible)
2. **Permissions**: Restricted to owner only (600/700)
3. **IP Truncation**: Protects user privacy
4. **Error Handling**: Logging failures don't break the application
5. **Log Rotation**: Consider implementing log rotation for production (not included)

### Log Retention

- Logs are appended indefinitely
- No automatic cleanup (consider implementing log rotation)
- For production, consider:
  - Log rotation (daily/weekly)
  - Archival of old logs
  - Maximum log file size limits

---

## Security Benefits Summary

### CSRF Protection
- ✅ Prevents unauthorized state-changing requests
- ✅ Defense in depth (works with SameSite cookies)
- ✅ Timing-safe token comparison
- ✅ Token stored securely (httpOnly cookie)

### Audit Logging
- ✅ Complete audit trail of admin actions
- ✅ Privacy-protected (truncated IPs)
- ✅ Secure storage (outside public_html)
- ✅ Helps detect suspicious activity
- ✅ Useful for troubleshooting

---

## Testing

### Test CSRF Protection
1. Try making a POST request without CSRF token → Should fail (403)
2. Try making a POST request with invalid CSRF token → Should fail (403)
3. Try making a POST request with valid CSRF token → Should succeed

### Test Audit Logging
1. Perform admin actions (login, create recipe, etc.)
2. Check `.logs/audit.log` file
3. Verify IP addresses are truncated
4. Verify all actions are logged

---

## Troubleshooting

### CSRF Token Errors

**Error**: "Invalid CSRF token"
- **Cause**: Token mismatch or missing token
- **Solution**: 
  - Ensure token is sent in `X-CSRF-Token` header
  - Check that token was received from login response
  - Verify cookie is set correctly

### Audit Log Issues

**Error**: Logs not being written
- **Cause**: Permission issues or directory doesn't exist
- **Solution**:
  - Check `.logs/` directory exists and has write permissions
  - Verify file permissions (600 for file, 700 for directory)
  - Check server logs for errors

---

## Future Enhancements

1. **Log Rotation**: Implement automatic log rotation
2. **Log Analysis**: Add endpoint to view logs in admin interface
3. **Alerting**: Email alerts for suspicious activity
4. **Database Storage**: Move logs to database for better querying
5. **Log Compression**: Compress old logs to save space

