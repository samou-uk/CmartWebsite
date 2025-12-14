<?php
/**
 * Security Headers Fallback
 * 
 * If .htaccess headers aren't working, this file can be auto-prepended
 * to set security headers on all PHP requests.
 * 
 * To use: Configure .user.ini in public_html with:
 * auto_prepend_file = /home/username/public_html/_headers.php
 */

// Only set headers if not already set (prevents duplicate headers)
if (!headers_sent()) {
    // Clickjacking protection
    header("X-Frame-Options: DENY");
    
    // XSS Protection
    header("X-XSS-Protection: 1; mode=block");
    
    // Prevent MIME type sniffing
    header("X-Content-Type-Options: nosniff");
    
    // Cross-domain policies
    header("X-Permitted-Cross-Domain-Policies: none");
    
    // Strict Transport Security (HSTS) - Only if HTTPS is configured
    if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') {
        header("Strict-Transport-Security: max-age=31536000; includeSubDomains; preload");
    }
    
    // Referrer Policy
    header("Referrer-Policy: strict-origin-when-cross-origin");
    
    // Permissions Policy
    header("Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=(), interest-cohort=()");
    
    // Content Security Policy
    header("Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://tally.so https://www.google.com https://www.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; connect-src 'self' https://tally.so https://www.google.com; frame-src 'self' https://tally.so https://www.google.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;");
}


