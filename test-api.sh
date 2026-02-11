#!/bin/bash
# API Test Script for Admirus
# Run this on Hostinger to test database and API connectivity

echo "=========================================="
echo "🔍 Admirus API & Database Test"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Navigate to backend directory
cd /home/u849780045/domains/admirus.com.lk/backend 2>/dev/null || cd backend 2>/dev/null || echo "Adjust path if needed"

echo "📍 Current directory: $(pwd)"
echo ""

# Test 1: Check if .env exists
echo "=========================================="
echo "1️⃣  Testing .env file"
echo "=========================================="
if [ -f .env ]; then
    echo -e "${GREEN}✅ .env file exists${NC}"
    echo ""
    echo "Database Configuration:"
    grep "^DB_" .env | sed 's/DB_PASSWORD=.*/DB_PASSWORD=***hidden***/'
else
    echo -e "${RED}❌ .env file not found${NC}"
fi
echo ""

# Test 2: Database Connection
echo "=========================================="
echo "2️⃣  Testing Database Connection"
echo "=========================================="
php artisan tinker --execute="
try {
    \$pdo = DB::connection()->getPdo();
    echo '✅ Database connection successful!\n';
    echo 'Driver: ' . \$pdo->getAttribute(PDO::ATTR_DRIVER_NAME) . '\n';
    echo 'Server: ' . \$pdo->getAttribute(PDO::ATTR_SERVER_VERSION) . '\n';
} catch (\Exception \$e) {
    echo '❌ Database connection failed!\n';
    echo 'Error: ' . \$e->getMessage() . '\n';
}"
echo ""

# Test 3: Check if users table exists
echo "=========================================="
echo "3️⃣  Testing Users Table"
echo "=========================================="
php artisan tinker --execute="
try {
    \$count = DB::table('users')->count();
    echo '✅ Users table exists\n';
    echo 'Total users: ' . \$count . '\n';
    
    if (\$count > 0) {
        \$user = DB::table('users')->first();
        echo 'Sample user: ' . \$user->name . ' (' . \$user->email . ')' . '\n';
    }
} catch (\Exception \$e) {
    echo '❌ Users table check failed!\n';
    echo 'Error: ' . \$e->getMessage() . '\n';
}"
echo ""

# Test 4: Test API Routes
echo "=========================================="
echo "4️⃣  Testing API Routes"
echo "=========================================="
php artisan route:list --path=api | head -20
echo ""

# Test 5: Check permissions
echo "=========================================="
echo "5️⃣  Checking File Permissions"
echo "=========================================="
echo "Storage directory:"
ls -la storage 2>/dev/null | head -5
echo ""
echo "Bootstrap cache:"
ls -la bootstrap/cache 2>/dev/null | head -5
echo ""

# Test 6: Check Laravel logs for errors
echo "=========================================="
echo "6️⃣  Recent Laravel Logs (last 20 lines)"
echo "=========================================="
if [ -f storage/logs/laravel.log ]; then
    tail -20 storage/logs/laravel.log
else
    echo "No log file found"
fi
echo ""

# Test 7: Test actual API endpoint
echo "=========================================="
echo "7️⃣  Testing Live API Endpoint"
echo "=========================================="
echo "Testing: https://admirus.com.lk/backend/public/api/test"
curl -X GET "https://admirus.com.lk/backend/public/api/test" \
     -H "Content-Type: application/json" \
     -w "\nHTTP Status: %{http_code}\n" \
     2>/dev/null
echo ""

# Test 8: Config cache status
echo "=========================================="
echo "8️⃣  Laravel Cache Status"
echo "=========================================="
echo "Config cached:"
if [ -f bootstrap/cache/config.php ]; then
    echo -e "${GREEN}✅ Config is cached${NC}"
else
    echo -e "${YELLOW}⚠️  Config not cached (run: php artisan config:cache)${NC}"
fi
echo ""
echo "Routes cached:"
if [ -f bootstrap/cache/routes-v7.php ]; then
    echo -e "${GREEN}✅ Routes are cached${NC}"
else
    echo -e "${YELLOW}⚠️  Routes not cached (run: php artisan route:cache)${NC}"
fi
echo ""

echo "=========================================="
echo "✅ Testing Complete!"
echo "=========================================="
echo ""
echo "Next steps if issues found:"
echo "1. php artisan config:clear"
echo "2. php artisan cache:clear"
echo "3. php artisan config:cache"
echo "4. chmod -R 755 storage bootstrap/cache"
echo "5. chmod -R 777 storage/logs storage/framework"
echo ""
