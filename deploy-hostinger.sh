#!/bin/bash
# Hostinger Deployment Script
# Run this on your Hostinger server after pushing code

echo "🚀 Starting Laravel deployment on Hostinger..."

# Navigate to your project directory
# cd /home/u849780045/domains/admirus.com.lk/public_html

echo "📦 Installing/Updating Composer dependencies..."
composer install --no-dev --optimize-autoloader --no-interaction

echo "🔧 Clearing Laravel caches..."
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

echo "⚡ Optimizing Laravel..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "🗄️ Running database migrations..."
php artisan migrate --force

echo "🔐 Setting permissions..."
chmod -R 755 storage bootstrap/cache
chmod -R 777 storage/logs storage/framework

echo "✅ Deployment complete!"
echo ""
echo "⚠️  Important: Make sure your .env file is properly configured!"
echo "    Check SESSION_SECURE_COOKIE=true"
echo "    Check CORS_ALLOWED_ORIGINS includes your domain"
