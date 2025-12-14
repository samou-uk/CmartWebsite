# Security Setup for React SPA

Since this is now a pure React SPA (not Next.js), security headers need to be configured at the **server level** rather than in the application code.

## Current Security Implementation

### ✅ Implemented in HTML (Meta Tags)
- Content Security Policy (CSP) - via meta tag
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection
- Referrer Policy

**Note**: Meta tags are less effective than HTTP headers. Server-level headers are recommended.

### ✅ Implemented in .htaccess (Apache/cPanel)
- All security headers configured
- File access restrictions
- Compression enabled
- Cache headers

## Server Configuration Required

### For Apache/cPanel (Recommended)
1. Upload `.htaccess` file to your `public_html` directory
2. Ensure `mod_headers` is enabled on your server
3. Test headers using: https://securityheaders.com

### For Nginx
Add to your nginx configuration:
```nginx
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://tally.so https://www.google.com https://www.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; connect-src 'self' https://tally.so https://www.google.com; frame-src 'self' https://tally.so https://www.google.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "DENY" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), interest-cohort=()" always;
```

### For Node.js/Express
If using a Node.js server, add middleware:
```javascript
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://tally.so https://www.google.com https://www.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; connect-src 'self' https://tally.so https://www.google.com; frame-src 'self' https://tally.so https://www.google.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;");
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()');
  next();
});
```

## Security Features Checklist

### ✅ Content Security Policy (CSP)
- Prevents XSS attacks
- Controls resource loading
- Allows necessary third-party services (Tally, Google Fonts, Google Maps)

### ✅ XSS Protection
- Browser XSS filtering enabled

### ✅ Content Type Options
- Prevents MIME type sniffing

### ✅ Frame Options
- Prevents clickjacking attacks

### ✅ Referrer Policy
- Controls referrer information leakage

### ✅ Permissions Policy
- Restricts access to camera, microphone, geolocation

### ⚠️ HSTS (Strict Transport Security)
- **Only enable if HTTPS is properly configured**
- Currently commented out in `.htaccess`
- Uncomment when ready for production HTTPS

## Testing Security Headers

1. **Online Tools**:
   - https://securityheaders.com
   - https://observatory.mozilla.org

2. **Browser DevTools**:
   - Open Network tab
   - Check Response Headers for security headers

## Additional Security Recommendations

1. **HTTPS**: Ensure SSL/TLS certificate is properly configured
2. **Regular Updates**: Keep dependencies updated
3. **Dependency Scanning**: Use tools like `npm audit`
4. **Environment Variables**: Never commit sensitive data
5. **Input Validation**: All user inputs should be validated (currently handled client-side for recipes)

## Notes

- Meta tags in HTML provide basic protection but HTTP headers are more secure
- `.htaccess` file works for Apache/cPanel servers
- For other server types, configure headers at the server level
- Test headers after deployment to ensure they're working

