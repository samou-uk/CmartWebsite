<?php
/**
 * Check Security Headers
 * Visit this page to see what security headers are being sent
 * URL: https://cmartshop.co.uk/check-headers.php
 */

header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html>
<head>
    <title>Security Headers Check</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
        .header { background: #f0f0f0; padding: 10px; margin: 5px 0; border-left: 4px solid #4CAF50; }
        .missing { border-left-color: #f44336; background: #ffebee; }
        .present { border-left-color: #4CAF50; background: #e8f5e9; }
        h1 { color: #333; }
        .info { background: #e3f2fd; padding: 15px; margin: 20px 0; border-radius: 5px; }
    </style>
</head>
<body>
    <h1>Security Headers Check</h1>
    
    <div class="info">
        <strong>Note:</strong> This page shows the security headers currently being sent by your server.
        If headers are missing, check that:
        <ul>
            <li>The <code>.htaccess</code> file is in your <code>public_html</code> directory</li>
            <li><code>mod_headers</code> is enabled on your Apache server</li>
            <li>Your hosting provider allows <code>.htaccess</code> files</li>
        </ul>
    </div>

    <h2>Current Headers:</h2>
    <?php
    $requiredHeaders = [
        'Content-Security-Policy' => 'Prevents XSS attacks',
        'X-XSS-Protection' => 'Browser XSS filtering',
        'X-Content-Type-Options' => 'Prevents MIME sniffing',
        'X-Frame-Options' => 'Prevents clickjacking',
        'Referrer-Policy' => 'Controls referrer information',
        'Permissions-Policy' => 'Restricts browser features',
    ];

    $allHeaders = getallheaders();
    
    foreach ($requiredHeaders as $headerName => $description) {
        $found = false;
        $value = '';
        
        // Check all headers (case-insensitive)
        foreach ($allHeaders as $name => $val) {
            if (strtolower($name) === strtolower($headerName) || 
                strtolower($name) === strtolower('HTTP_' . str_replace('-', '_', $headerName))) {
                $found = true;
                $value = $val;
                break;
            }
        }
        
        // Also check via headers_list() for headers set by PHP
        if (!$found) {
            foreach (headers_list() as $header) {
                if (stripos($header, $headerName) === 0) {
                    $found = true;
                    $value = substr($header, strpos($header, ':') + 1);
                    break;
                }
            }
        }
        
        $class = $found ? 'present' : 'missing';
        $status = $found ? '✓ Present' : '✗ Missing';
        
        echo "<div class='header $class'>";
        echo "<strong>$headerName</strong> - $status<br>";
        echo "<small>$description</small>";
        if ($found && $value) {
            echo "<br><code style='font-size: 0.9em; word-break: break-all;'>" . htmlspecialchars($value) . "</code>";
        }
        echo "</div>";
    }
    ?>
    
    <h2>All Headers:</h2>
    <pre style="background: #f5f5f5; padding: 15px; overflow-x: auto;">
<?php
foreach ($allHeaders as $name => $value) {
    echo htmlspecialchars("$name: $value\n");
}
?>
    </pre>
</body>
</html>


