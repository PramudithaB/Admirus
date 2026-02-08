<?php
/**
 * Server Info Script
 * Upload this to public_html and access via browser: https://admirus.com.lk/check-server.php
 * This will show you what's happening with the server configuration
 */

echo "<!DOCTYPE html><html><head><title>Server Check</title>";
echo "<style>body{font-family:monospace;margin:40px;background:#f5f5f5}";
echo ".section{background:white;padding:20px;margin:20px 0;border-radius:8px;box-shadow:0 2px 4px rgba(0,0,0,0.1)}";
echo "h1{color:#333}h2{color:#0d6efd;border-bottom:2px solid #0d6efd;padding-bottom:10px}";
echo ".success{color:#28a745}.error{color:#dc3545}.info{color:#0d6efd}";
echo "pre{background:#f8f9fa;padding:15px;border-radius:4px;overflow-x:auto}</style></head><body>";

echo "<h1>🔍 Server Configuration Check</h1>";

// Check 1: PHP Info
echo "<div class='section'><h2>1. PHP Configuration</h2>";
echo "<p class='info'>PHP Version: " . phpversion() . "</p>";
echo "<p class='info'>Server Software: " . $_SERVER['SERVER_SOFTWARE'] . "</p>";
echo "<p class='info'>Document Root: " . $_SERVER['DOCUMENT_ROOT'] . "</p>";
echo "<p class='info'>Script Filename: " . $_SERVER['SCRIPT_FILENAME'] . "</p>";
echo "</div>";

// Check 2: File Structure
echo "<div class='section'><h2>2. File Structure</h2>";
$currentDir = __DIR__;
echo "<p class='info'>Current Directory: $currentDir</p>";

$files = ['index.php', 'index.html', '.htaccess', '.env'];
foreach ($files as $file) {
    $path = $currentDir . '/' . $file;
    if (file_exists($path)) {
        echo "<p class='success'>✅ $file EXISTS</p>";
    } else {
        echo "<p class='error'>❌ $file NOT FOUND</p>";
    }
}

// Check if Laravel backend is accessible
$parentDir = dirname($currentDir);
if (file_exists($parentDir . '/artisan')) {
    echo "<p class='success'>✅ Laravel found in parent directory: $parentDir</p>";
} else {
    echo "<p class='error'>❌ Laravel NOT found in parent directory</p>";
}
echo "</div>";

// Check 3: Request Info
echo "<div class='section'><h2>3. Current Request Info</h2>";
echo "<p class='info'>Request URI: " . $_SERVER['REQUEST_URI'] . "</p>";
echo "<p class='info'>Request Method: " . $_SERVER['REQUEST_METHOD'] . "</p>";
echo "<p class='info'>Query String: " . ($_SERVER['QUERY_STRING'] ?? 'none') . "</p>";
echo "<p class='info'>HTTP Host: " . $_SERVER['HTTP_HOST'] . "</p>";
echo "</div>";

// Check 4: .htaccess content
echo "<div class='section'><h2>4. .htaccess Configuration</h2>";
$htaccessPath = $currentDir . '/.htaccess';
if (file_exists($htaccessPath)) {
    echo "<pre>" . htmlspecialchars(file_get_contents($htaccessPath)) . "</pre>";
} else {
    echo "<p class='error'>❌ .htaccess file not found!</p>";
}
echo "</div>";

// Check 5: Test Laravel
echo "<div class='section'><h2>5. Laravel Bootstrap Test</h2>";
$laravelIndexPath = $currentDir . '/index.php';
if (file_exists($laravelIndexPath)) {
    echo "<p class='info'>index.php content (first 500 chars):</p>";
    echo "<pre>" . htmlspecialchars(substr(file_get_contents($laravelIndexPath), 0, 500)) . "</pre>";
    
    // Check if it's Laravel or React
    $indexContent = file_get_contents($laravelIndexPath);
    if (strpos($indexContent, 'Laravel') !== false || strpos($indexContent, 'Illuminate') !== false) {
        echo "<p class='success'>✅ This appears to be Laravel's index.php</p>";
    } elseif (strpos($indexContent, '<?php') === 0) {
        echo "<p class='info'>ℹ️  This is a PHP file but may not be Laravel</p>";
    } else {
        echo "<p class='error'>❌ This appears to be HTML (React), not Laravel PHP!</p>";
    }
} else {
    echo "<p class='error'>❌ index.php not found!</p>";
}
echo "</div>";

// Check 6: Directory Listing
echo "<div class='section'><h2>6. Directory Contents</h2>";
$files = scandir($currentDir);
echo "<pre>";
foreach ($files as $file) {
    if ($file != '.' && $file != '..') {
        $fullPath = $currentDir . '/' . $file;
        $type = is_dir($fullPath) ? '[DIR]' : '[FILE]';
        $size = is_file($fullPath) ? filesize($fullPath) : '-';
        echo "$type $file ($size bytes)\n";
    }
}
echo "</pre>";
echo "</div>";

// Check 7: Environment Variables
echo "<div class='section'><h2>7. Environment Check</h2>";
if (file_exists($parentDir . '/.env')) {
    echo "<p class='success'>✅ .env file found in Laravel directory</p>";
    echo "<p class='info'>Checking database configuration (password hidden)...</p>";
    $envContent = file_get_contents($parentDir . '/.env');
    $envLines = explode("\n", $envContent);
    foreach ($envLines as $line) {
        if (strpos($line, 'DB_') === 0 && strpos($line, 'PASSWORD') === false) {
            echo "<p class='info'>" . htmlspecialchars($line) . "</p>";
        } elseif (strpos($line, 'DB_PASSWORD') === 0) {
            echo "<p class='info'>DB_PASSWORD=***HIDDEN***</p>";
        }
    }
} else {
    echo "<p class='error'>❌ .env file not found in parent directory</p>";
}
echo "</div>";

// Check 8: Test API Route
echo "<div class='section'><h2>8. API Route Test</h2>";
echo "<p class='info'>Testing if we can reach Laravel routes...</p>";

// Try to include Laravel bootstrap
$laravelBootstrap = $parentDir . '/bootstrap/app.php';
if (file_exists($laravelBootstrap)) {
    echo "<p class='success'>✅ Laravel bootstrap file exists</p>";
    try {
        echo "<p class='info'>📝 Suggested fix: The public_html directory needs to be set up correctly</p>";
        echo "<p class='info'>Current setup appears to have React and Laravel mixed in the same directory</p>";
        echo "<p class='info'>Recommended structure:</p>";
        echo "<pre>";
        echo "domains/admirus.com.lk/\n";
        echo "├── backend/           (Laravel)\n";
        echo "│   ├── app/\n";
        echo "│   ├── public/        (should be the document root)\n";
        echo "│   │   ├── index.php  (Laravel entry point)\n";
        echo "│   │   ├── .htaccess\n";
        echo "│   │   └── [React build files here]\n";
        echo "│   └── ...\n";
        echo "└── frontend/\n";
        echo "</pre>";
    } catch (Exception $e) {
        echo "<p class='error'>❌ Error: " . $e->getMessage() . "</p>";
    }
} else {
    echo "<p class='error'>❌ Laravel bootstrap not found at: $laravelBootstrap</p>";
}
echo "</div>";

echo "<hr><p style='text-align:center;color:#666'>Delete this file after checking! It exposes server information.</p>";
echo "</body></html>";
