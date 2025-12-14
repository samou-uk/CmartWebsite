# PHP Security Headers Setup

If `.htaccess` headers aren't working, use this PHP-based fallback solution.

## Option 1: Auto-Prepend (Recommended)

### Step 1: Upload Files
1. Upload `_headers.php` to your `public_html` directory
2. Upload `.user.ini` to your `public_html` directory

### Step 2: Configure Path
Edit `.user.ini` and update the path if needed:
```ini
auto_prepend_file = /home/yourusername/public_html/_headers.php
```
(Replace `yourusername` with your cPanel username)

### Step 3: Verify
- Visit `https://cmartshop.co.uk/check-headers.php`
- Headers should now be set on all PHP requests

## Option 2: PHP Wrapper for React App

If you need headers on your React app (which is static HTML), you can:

### Step 1: Rename index.html
1. Keep `index.html` as is (for direct access)
2. Or create `index.php` that includes headers and serves the HTML

### Step 2: Configure Server
In cPanel, set your default document to `index.php` (it will fall back to `index.html`)

## Option 3: Manual Include

For specific PHP files, include at the top:
```php
<?php
require_once __DIR__ . '/_headers.php';
// ... rest of your PHP code
?>
```

## Testing

1. **Check Headers Page**: Visit `https://cmartshop.co.uk/check-headers.php`
2. **Browser DevTools**: Network tab → Response Headers
3. **Online Tools**:
   - https://securityheaders.com/?q=https://cmartshop.co.uk
   - https://observatory.mozilla.org/

## Notes

- `.user.ini` only affects PHP files, not static HTML/JS/CSS
- For a React SPA, you may need to use `index.php` wrapper
- Headers set via PHP work for all PHP requests
- Static files (HTML, JS, CSS) won't get PHP headers unless served through PHP

## Troubleshooting

### Headers Not Showing
- Check `.user.ini` path is correct
- Verify `_headers.php` is in `public_html`
- Check file permissions (644 for `.user.ini`, 644 for `_headers.php`)
- Some hosts require absolute paths in `.user.ini`

### 500 Error
- Check PHP syntax in `_headers.php`
- Verify path in `.user.ini` is correct
- Check server error logs in cPanel

### Only PHP Files Get Headers
- This is expected - `.user.ini` only affects PHP
- For static files, use `.htaccess` or `index.php` wrapper


