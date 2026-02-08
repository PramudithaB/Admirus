#!/bin/bash
# Complete Deployment Script for Hostinger
# This script must be run on the Hostinger server via SSH

set -e  # Exit on error

echo "=============================================="
echo "🚀 Admirus Complete Deployment"
echo "=============================================="
echo ""

# Configuration
PROJECT_PATH="/home/u849780045/domains/admirus.com.lk"
BACKEND_PATH="$PROJECT_PATH/backend"

# Navigate to project root
cd "$PROJECT_PATH" || { echo "❌ Project path not found!"; exit 1; }

echo "📍 Current directory: $(pwd)"
echo ""

# Step 1: Pull latest code
echo "=============================================="
echo "1️⃣  Pulling latest code from Git"
echo "=============================================="
git pull origin main
echo "✅ Code updated"
echo ""

# Step 2: Navigate to backend
cd "$BACKEND_PATH" || { echo "❌ Backend path not found!"; exit 1; }

# Step 3: Install/Update Composer dependencies
echo "=============================================="
echo "2️⃣  Installing Composer dependencies"
echo "=============================================="
if [ -f "composer.json" ]; then
    composer install --no-dev --optimize-autoloader --no-interaction
    echo "✅ Composer dependencies installed"
else
    echo "⚠️  composer.json not found!"
fi
echo ""

# Step 4: Clear ALL caches
echo "=============================================="
echo "3️⃣  Clearing Laravel caches"
echo "=============================================="
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
echo "✅ All caches cleared"
echo ""

# Step 5: Optimize for production
echo "=============================================="
echo "4️⃣  Optimizing Laravel for production"
echo "=============================================="
php artisan config:cache
php artisan route:cache
php artisan view:cache
echo "✅ Laravel optimized"
echo ""

# Step 6: Run migrations
echo "=============================================="
echo "5️⃣  Running database migrations"
echo "=============================================="
php artisan migrate --force
echo "✅ Migrations completed"
echo ""

# Step 7: Fix permissions
echo "=============================================="
echo "6️⃣  Setting correct permissions"
echo "=============================================="
chmod -R 755 storage bootstrap/cache
chmod -R 777 storage/logs storage/framework/sessions storage/framework/views storage/framework/cache
echo "✅ Permissions set"
echo ""

# Step 8: Test database connection
echo "=============================================="
echo "7️⃣  Testing database connection"
echo "=============================================="
php artisan tinker --execute="
try {
    \$pdo = DB::connection()->getPdo();
    echo '✅ Database connected: ' . \$pdo->getAttribute(PDO::ATTR_DRIVER_NAME) . PHP_EOL;
    echo '✅ Users count: ' . DB::table('users')->count() . PHP_EOL;
} catch (Exception \$e) {
    echo '❌ Database error: ' . \$e->getMessage() . PHP_EOL;
}
"
echo ""

# Step 9: Test API endpoint
echo "=============================================="
echo "8️⃣  Testing API endpoint"
echo "=============================================="
curl -s -X GET "https://admirus.com.lk/api/test" | head -c 200
echo ""
echo ""

# Step 10: Check logs for errors
echo "=============================================="
echo "9️⃣  Checking recent logs"
echo "=============================================="
if [ -f "storage/logs/laravel.log" ]; then
    echo "Last 5 log entries:"
    tail -5 storage/logs/laravel.log
else
    echo "✅ No log file (good sign!)"
fi
echo ""

# Summary
echo "=============================================="
echo "✅ DEPLOYMENT COMPLETE!"
echo "=============================================="
echo ""
echo "🔍 Next Steps:"
echo "1. Test registration: https://admirus.com.lk/register"
echo "2. Test login: https://admirus.com.lk/login"
echo "3. Check browser console for any errors (F12)"
echo ""
echo "📋 If issues persist, check:"
echo "   - Laravel logs: tail -f storage/logs/laravel.log"
echo "   - .env file configuration"
echo "   - Database credentials"
echo ""
echo "🆘 Emergency commands:"
echo "   php artisan config:clear && php artisan cache:clear"
echo "   php artisan tinker --execute=\"DB::connection()->getPdo();\""
echo ""
