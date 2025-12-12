# Security Features

This document outlines the security measures implemented on the Cmart website.

## Security Headers

The following security headers are configured in `next.config.js`:

### Content Security Policy (CSP)
- Restricts resource loading to trusted sources
- Prevents XSS attacks by controlling script execution
- Allows necessary third-party services (Tally forms, Google Maps)

### XSS Protection
- `X-XSS-Protection: 1; mode=block` - Enables browser XSS filtering

### Content Type Options
- `X-Content-Type-Options: nosniff` - Prevents MIME type sniffing

### Frame Options
- `X-Frame-Options: DENY` - Prevents clickjacking attacks

### Referrer Policy
- `Referrer-Policy: strict-origin-when-cross-origin` - Controls referrer information

### Permissions Policy
- Restricts access to camera, microphone, geolocation, and interest-cohort APIs

### Strict Transport Security (HSTS)
- `Strict-Transport-Security` - Forces HTTPS connections (when deployed with HTTPS)

## Additional Security Measures

1. **React Strict Mode** - Enabled for better error detection
2. **Powered-By Header** - Removed to hide server information
3. **Compression** - Enabled for better performance
4. **Input Validation** - All user inputs should be validated
5. **HTTPS** - Required for production deployment

## Recommendations

1. Update the domain URLs in `app/layout.tsx` and `app/sitemap.ts` when deploying
2. Add Google Search Console verification code in `app/layout.tsx`
3. Ensure HTTPS is properly configured in production
4. Regularly update dependencies for security patches
5. Monitor security headers using tools like [SecurityHeaders.com](https://securityheaders.com)


