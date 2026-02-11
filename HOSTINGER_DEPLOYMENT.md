# Hostinger Deployment Commands

Run these commands via SSH after pushing your code to Hostinger:

## 1. Connect to Hostinger via SSH

```bash
ssh u849780045@admirus.com.lk -p 65002
```
(Port may vary - check your Hostinger SSH details)

## 2. Navigate to your project

```bash
cd domains/admirus.com.lk/public_html
```

## 3. Clear all Laravel caches (REQUIRED after every deployment)

```bash
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
```

## 4. Rebuild caches for better performance

```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## 5. Run migrations (if needed)

```bash
php artisan migrate --force
```

## 6. Fix permissions

```bash
chmod -R 755 storage bootstrap/cache
chmod -R 777 storage/logs storage/framework
```

---

## Quick Cache Clear (Use this after every Git pull)

```bash
php artisan config:clear && php artisan cache:clear && php artisan route:clear && php artisan view:clear && php artisan config:cache
```

---

## Troubleshooting Database Issues

### Check database connection:
```bash
php artisan tinker
>>> DB::connection()->getPdo();
```

If you see an error, update your .env file:

1. **Option 1:** Try `DB_HOST=localhost` instead of `127.0.0.1`
2. **Option 2:** Check with Hostinger support for correct DB_HOST value

### Test API endpoints:
```bash
curl -X GET https://admirus.com.lk/api/companies
```

---

## Important .env Settings for Production

Make sure these are in your Hostinger .env file:

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://admirus.com.lk
SESSION_SECURE_COOKIE=true
CORS_ALLOWED_ORIGINS=http://localhost:3000,https://admirus.com.lk,https://www.admirus.com.lk
SANCTUM_STATEFUL_DOMAINS=admirus.com.lk,www.admirus.com.lk
SESSION_DOMAIN=.admirus.com.lk
```

---

## Full Deployment Workflow

1. **Local machine:**
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```

2. **Hostinger SSH:**
   ```bash
   cd domains/admirus.com.lk/public_html
   git pull origin main
   php artisan config:clear && php artisan cache:clear
   php artisan config:cache
   chmod -R 755 storage bootstrap/cache
   ```

3. **Test your site:** Visit https://admirus.com.lk

---

## Automated Script

You can also run the deployment script:

```bash
chmod +x deploy-hostinger.sh
./deploy-hostinger.sh
```
