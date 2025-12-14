# Security Headers Troubleshooting

If you're not seeing security headers, follow these steps:

## Step 1: Verify .htaccess is Uploaded

1. Check that `.htaccess` file is in your `public_html` directory
2. Make sure the filename is exactly `.htaccess` (with the dot at the beginning)
3. Verify file permissions: should be readable (644 or 755)

## Step 2: Check if mod_headers is Enabled

### Option A: Check via cPanel
1. Go to **Software** → **Select PHP Version** → **Extensions**
2. Look for `mod_headers` or check Apache modules

### Option B: Check via PHP
Create a test file `test-headers.php`:
```php
<?php
if (function_exists('apache_get_modules')) {
    $modules = apache_get_modules();
    if (in_array('mod_headers', $modules)) {
        echo "mod_headers is ENABLED";
    } else {
        echo "mod_headers is NOT ENABLED";
    }
} else {
    echo "Cannot check modules (function not available)";
}
?>
```

## Step 3: Test Headers

1. Visit: `https://cmartshop.co.uk/check-headers.php`
2. This will show you which headers are present and which are missing
3. Check browser DevTools → Network tab → Response Headers

## Step 4: Alternative Solutions

### If mod_headers is NOT Available

#### Option 1: Contact Your Host
Ask your hosting provider to enable `mod_headers` for your account.

#### Option 2: Use PHP Headers (Less Secure)
If you can't use `.htaccess`, you can set headers via PHP. Create `public_html/headers.php`:

```php
<?php
header("Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://tally.so https://www.google.com https://www.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; connect-src 'self' https://tally.so https://www.google.com; frame-src 'self' https://tally.so https://www.google.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;");
header("X-XSS-Protection: 1; mode=block");
header("X-Content-Type-Options: nosniff");
header("X-Frame-Options: DENY");
header("Referrer-Policy: strict-origin-when-cross-origin");
header("Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()");
?>
```

Then include it in your `index.html` via a PHP wrapper, or use it as an auto-prepend file.

#### Option 3: Use .user.ini (PHP-FPM)
If using PHP-FPM, create `.user.ini` in `public_html`:
```ini
auto_prepend_file = /home/username/headers.php
```

## Step 5: Verify with Online Tools

1. **SecurityHeaders.com**: https://securityheaders.com/?q=https://cmartshop.co.uk
2. **Mozilla Observatory**: https://observatory.mozilla.org/

## Common Issues

### Headers Not Showing
- `.htaccess` file not uploaded to `public_html`
- `mod_headers` not enabled
- File permissions incorrect
- Hosting provider blocks `.htaccess` modifications

### Headers Partially Working
- Some headers work, others don't → Check for syntax errors in `.htaccess`
- CSP too strict → May need to adjust allowed sources

### 500 Internal Server Error
- Syntax error in `.htaccess`
- Module not available
- Check server error logs in cPanel

## Quick Test

Run this command in your browser console on your site:
```javascript
fetch('/').then(r => {
    console.log('CSP:', r.headers.get('content-security-policy'));
    console.log('X-Frame-Options:', r.headers.get('x-frame-options'));
    console.log('X-Content-Type-Options:', r.headers.get('x-content-type-options'));
});
```

This will show you which headers are actually being sent.


