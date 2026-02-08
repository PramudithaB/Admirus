#!/bin/bash
# Quick Test Script for Live Site Database
# Run this to test if the database is accessible and can be written to

echo "=============================================="
echo "🧪 Quick Database Write Test"
echo "=============================================="
echo ""

# Test 1: Basic database connection
echo "1️⃣  Testing database connection..."
curl -s "https://admirus.com.lk/api/debug-db" | python3 -m json.tool || curl -s "https://admirus.com.lk/api/debug-db"
echo ""
echo ""

# Test 2: Test direct database write
echo "2️⃣  Testing direct database write (creates a test user)..."
curl -s -X POST "https://admirus.com.lk/api/test-register" \
  -H "Content-Type: application/json" | python3 -m json.tool || curl -s -X POST "https://admirus.com.lk/api/test-register"
echo ""
echo ""

# Test 3: Try actual registration
echo "3️⃣  Testing actual registration endpoint..."
TIMESTAMP=$(date +%s)
curl -s -X POST "https://admirus.com.lk/api/register" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"Test User $TIMESTAMP\",
    \"email\": \"test$TIMESTAMP@example.com\",
    \"password\": \"password123\",
    \"password_confirmation\": \"password123\"
  }" | python3 -m json.tool || curl -s -X POST "https://admirus.com.lk/api/register" \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test$TIMESTAMP\",\"email\":\"test$TIMESTAMP@test.com\",\"password\":\"password123\",\"password_confirmation\":\"password123\"}"
echo ""
echo ""

echo "=============================================="
echo "✅ Tests Complete"
echo "=============================================="
echo ""
echo "📝 Check the results above:"
echo "   - Test 1 should show database name and user count"
echo "   - Test 2 should create a test user successfully"
echo "   - Test 3 should register a new user with token"
echo ""
echo "If any test fails, check Laravel logs on the server:"
echo "   ssh u849780045@admirus.com.lk"
echo "   cd domains/admirus.com.lk/backend"
echo "   tail -50 storage/logs/laravel.log"
echo ""
