# Recipe Management System - Security Documentation

This document outlines all security measures implemented for the recipe management admin interface.

## Overview

The recipe management system uses a multi-layered security approach combining authentication, authorization, rate limiting, and security through obscurity to protect the admin interface and API endpoints.

---

## 1. Authentication System

### 1.1 Server-Side Authentication
- **Location**: `lib/auth.ts`, `app/api/auth/login/route.ts`
- **Implementation**: Password-based authentication with bcrypt hashing and server-side session management
- **Password Storage**: bcrypt hash stored in environment variable `ADMIN_PASSWORD_HASH` (never plain text, never exposed to client)
- **Session Management**: Uses httpOnly cookies for session storage

### 1.2 Session Cookies
- **Cookie Name**: `admin_session`
- **Properties**:
  - `httpOnly: true` - Prevents JavaScript access (XSS protection)
  - `secure: true` (production only) - Only sent over HTTPS
  - `sameSite: 'strict'` - Prevents CSRF attacks
  - `maxAge: 24 hours` - Automatic expiration
  - `path: '/'` - Available site-wide

### 1.3 Session Data Structure
```typescript
interface SessionData {
  authenticated: boolean
  expiresAt: number  // Timestamp in milliseconds
}
```

### 1.4 Session Validation
- Sessions are validated on every API request
- Expired sessions are automatically rejected
- Invalid session data is rejected
- Session validation happens server-side only

---

## 2. Rate Limiting

### 2.1 Login Rate Limiting
- **Location**: `lib/auth.ts` - `checkRateLimit()` function
- **Limits**:
  - Maximum 5 login attempts per IP address
  - Time window: 15 minutes
  - Lockout duration: Remaining time in the 15-minute window
- **Identifier**: Based on IP address (`x-forwarded-for` or `x-real-ip` header)
- **Storage**: In-memory Map (for production, consider Redis)

### 2.2 Rate Limit Behavior
- Failed login attempts increment the counter
- Successful login clears the rate limit for that IP
- Rate limit information is returned to the client (remaining attempts, reset time)
- HTTP 429 status code returned when limit exceeded

### 2.3 Rate Limit Response
```json
{
  "error": "Too many login attempts",
  "message": "Please try again in X minutes",
  "resetAt": 1234567890
}
```

---

## 3. API Route Protection

### 3.1 Protected Endpoints
All recipe management API routes require authentication:
- `GET /api/recipes` - Fetch all recipes
- `POST /api/recipes` - Create new recipe
- `PUT /api/recipes` - Update existing recipe
- `DELETE /api/recipes?slug=...` - Delete recipe

### 3.2 Authorization Check
- **Location**: `app/api/recipes/route.ts` - `isAuthorized()` function
- **Implementation**: Checks for valid `admin_session` cookie on every request
- **Response**: Returns HTTP 401 Unauthorized if authentication fails

### 3.3 Authorization Flow
```typescript
function isAuthorized(request: NextRequest): boolean {
  const sessionCookie = request.cookies.get('admin_session')
  return validateSession(sessionCookie?.value)
}
```

---

## 4. Security Through Obscurity

### 4.1 Obfuscated Admin Path
- **Location**: `lib/admin-path.ts`
- **Format**: `admin-{20 alphanumeric characters}`
- **Current Path**: `admin-vJWIU8yIa8OU4IEVVrOE`
- **Purpose**: Makes the admin interface harder to discover
- **Configuration**: Can be set via `ADMIN_PATH` environment variable

### 4.2 Path Generation
To generate a new admin path:
```bash
node -e "const chars='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'; console.log('admin-'+Array.from({length:20},()=>chars[Math.floor(Math.random()*chars.length)]).join(''))"
```

---

## 5. Search Engine Protection

### 5.1 robots.txt Configuration
- **Location**: `public/robots.txt`
- **Rules**:
  - `Disallow: /api/` - Blocks all API endpoints
  - `Disallow: /_next/` - Blocks Next.js internal files
  - `Disallow: /admin-*/` - Blocks all admin paths (pattern matching)

### 5.2 Purpose
- Prevents search engines from indexing admin interfaces
- Reduces exposure of admin paths
- Protects API endpoints from discovery

---

## 6. Error Handling & User Feedback

### 6.1 Custom 401 Unauthorized Page
- **Location**: `app/unauthorized/page.tsx`
- **Purpose**: User-friendly error page for unauthorized access
- **Features**: Clear messaging, navigation links, branded design

### 6.2 API Error Responses
- **401 Unauthorized**: Invalid or missing session
- **429 Too Many Requests**: Rate limit exceeded
- **400 Bad Request**: Invalid input data
- **500 Internal Server Error**: Server-side errors

### 6.3 Error Message Security
- Generic error messages for security (don't reveal system details)
- Detailed errors logged server-side only
- No sensitive information in client responses

---

## 7. Environment Variables

### 7.1 Required Environment Variables
```env
# Admin authentication (bcrypt hash)
# Generate using: node scripts/hash-password.js "your-password"
ADMIN_PASSWORD_HASH=$2a$12$your-bcrypt-hash-here

# Optional: Custom admin path
ADMIN_PATH=admin-vJWIU8yIa8OU4IEVVrOE

# Optional: Session secret (auto-generated if not set)
SESSION_SECRET=your-session-secret-here
```

### 7.2 Security Best Practices
- Never commit `.env` files to version control
- Use strong, unique passwords
- Rotate secrets periodically
- Use different secrets for development and production

---

## 8. Password Verification

### 8.1 Server-Side Only with bcrypt Hashing
- **Location**: `lib/auth.ts` - `verifyPassword()` function
- **Implementation**: bcrypt password hashing and comparison (server-side only)
- **Security**: 
  - Password hash stored in environment variable (never plain text)
  - bcrypt with 12 salt rounds for secure hashing
  - Password never exposed to client-side code
  - Timing-safe comparison prevents timing attacks

### 8.2 Current Implementation
```typescript
export async function verifyPassword(password: string): Promise<boolean> {
  if (!ADMIN_PASSWORD_HASH) {
    console.error('ADMIN_PASSWORD_HASH environment variable is not set')
    return false
  }
  
  try {
    // Compare the provided password with the stored hash
    return await bcrypt.compare(password, ADMIN_PASSWORD_HASH)
  } catch (error) {
    console.error('Password verification error:', error)
    return false
  }
}
```

### 8.3 Password Hash Generation
- **Utility Script**: `scripts/hash-password.js`
- **Usage**: `node scripts/hash-password.js "your-password-here"`
- **Salt Rounds**: 12 (balance between security and performance)
- **Output**: bcrypt hash string (starts with `$2a$12$`)

---

## 9. Session Expiration

### 9.1 Automatic Expiration
- **Duration**: 24 hours from login
- **Validation**: Checked on every authenticated request
- **Behavior**: Expired sessions are automatically rejected
- **User Experience**: User must re-authenticate after expiration

### 9.2 Session Expiration Check
```typescript
if (Date.now() > session.expiresAt) {
  return false  // Session expired
}
```

---

## 10. Input Validation

### 10.1 Request Validation
- Password validation: Checks for non-empty string
- Recipe data validation: Validates required fields
- Slug validation: Auto-generates from title if not provided
- Type checking: Validates data types before processing

### 10.2 Sanitization
- Slug generation: Removes special characters, converts to lowercase
- Recipe data: Validates against TypeScript interfaces
- Error handling: Prevents malformed data from being saved

---

## 11. Security Headers

### 11.1 Existing Site-Wide Headers
The recipe management system benefits from site-wide security headers configured in `next.config.js`:
- Content Security Policy (CSP)
- X-XSS-Protection
- X-Content-Type-Options
- X-Frame-Options
- Referrer-Policy
- Permissions-Policy
- Strict-Transport-Security (HSTS)

---

## 12. Security Considerations

### 12.1 Current Limitations
1. **In-Memory Rate Limiting**: Rate limit data is lost on server restart
   - **Recommendation**: Use Redis or database for production
2. **Session Storage**: Stored in cookie (not in database)
   - **Recommendation**: Consider database storage for session revocation
3. **Single Admin User**: System designed for single admin account
   - **Recommendation**: For multiple users, implement user database with roles

### 12.2 Production Recommendations
1. **Use HTTPS**: Ensure all traffic is encrypted
2. **Strong Passwords**: Use complex, unique passwords
3. **Regular Updates**: Keep dependencies updated
4. **Monitoring**: Log authentication attempts
5. **Backup**: Regular backups of recipe data
6. **Access Logs**: Monitor admin access patterns

### 12.3 Additional Security Measures (Future)
- Two-factor authentication (2FA)
- IP whitelisting for admin access
- Session revocation capability
- Audit logging for all admin actions
- Password complexity requirements
- Account lockout after multiple failed attempts

---

## 13. File System Security

### 13.1 Recipe File Storage
- **Location**: `data/recipes/*.json`
- **Access**: Server-side only (not exposed via public routes)
- **Validation**: All file operations validated before execution
- **Error Handling**: Graceful error handling for file operations

### 13.2 File Operation Security
- Path validation prevents directory traversal
- File existence checks before operations
- Atomic operations where possible
- Error messages don't reveal file system structure

---

## 14. API Security Best Practices

### 14.1 Implemented Practices
✅ Server-side authentication with bcrypt password hashing  
✅ Session-based authorization  
✅ Rate limiting on login  
✅ Input validation  
✅ Error handling  
✅ Secure cookie configuration  
✅ HTTPS enforcement (via middleware)  
✅ Timing-safe password comparison  

### 14.2 Request Flow
1. Client sends request with session cookie
2. Server validates session
3. Server checks authorization
4. Server processes request
5. Server returns response (or error)

---

## 15. Testing Security

### 15.1 Security Testing Checklist
- [ ] Test invalid password rejection
- [ ] Test expired session rejection
- [ ] Test rate limiting functionality
- [ ] Test unauthorized API access
- [ ] Test session cookie security
- [ ] Test input validation
- [ ] Test error message security

---

## Summary

The recipe management system implements multiple layers of security:

1. **Authentication**: Server-side password verification with httpOnly cookies
2. **Authorization**: Session-based access control for all API endpoints
3. **Rate Limiting**: Protection against brute force attacks
4. **Obscurity**: Obfuscated admin path to reduce discoverability
5. **Search Engine Protection**: robots.txt prevents indexing
6. **Session Management**: Automatic expiration and validation
7. **Error Handling**: Secure error messages and custom error pages
8. **Input Validation**: Server-side validation of all inputs

This multi-layered approach provides strong security for the admin interface while maintaining usability for authorized administrators.

