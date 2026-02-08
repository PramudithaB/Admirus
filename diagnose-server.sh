#!/bin/bash
# Server Diagnostic Script
# Run this on Hostinger to diagnose the routing issue

echo "=============================================="
echo "🔍 Server Structure Diagnostic"
echo "=============================================="
echo ""

# Check current directory
echo "📍 Current directory:"
pwd
echo ""

# Check if we're in the right place
echo "📁 Directory structure:"
ls -la | head -20
echo ""

# Check if index.php exists
echo "🔍 Looking for index.php:"
if [ -f "index.php" ]; then
    echo "✅ index.php found in current directory"
    echo "First 10 lines of index.php:"
    head -10 index.php
else
    echo "❌ index.php NOT found in current directory"
fi
echo ""

# Check .htaccess
echo "🔍 Checking .htaccess:"
if [ -f ".htaccess" ]; then
    echo "✅ .htaccess found"
    echo "Content:"
    cat .htaccess
else
    echo "❌ .htaccess NOT found"
fi
echo ""

# Check API route
echo "🔍 Testing index.php directly:"
php index.php <<EOF
<?php
\$_SERVER['REQUEST_URI'] = '/api/test';
\$_SERVER['REQUEST_METHOD'] = 'GET';
?>
EOF
echo ""

# Check Laravel is accessible
echo "🔍 Testing Laravel artisan:"
cd ..
if [ -f "artisan" ]; then
    echo "✅ Found Laravel in parent directory"
    php artisan route:list | grep api | head -10
else
    echo "❌ Laravel artisan not found in parent directory"
fi
echo ""

echo "=============================================="
echo "✅ Diagnostic Complete"
echo "=============================================="
