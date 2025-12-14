<?php
/**
 * PHP Wrapper for React SPA
 * This file sets security headers and serves the React app
 * Use this if .htaccess and .user.ini don't work
 */

// Include security headers
require_once __DIR__ . '/_headers.php';

// Serve the React app's index.html
$indexFile = __DIR__ . '/index.html';

if (file_exists($indexFile)) {
    // Read and output the HTML file
    readfile($indexFile);
} else {
    // Fallback if index.html doesn't exist
    http_response_code(404);
    echo '<!DOCTYPE html><html><head><title>404 Not Found</title></head><body><h1>404 - File Not Found</h1></body></html>';
}
?>


