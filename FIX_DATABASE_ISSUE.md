# Quick Fix for Database Not Saving on Hostinger

## ✅ FIXED ISSUES

### 1. CORS Configuration
- **Problem:** API requests were blocked because CORS only allowed `localhost:3000`
- **Solution:** Updated [config/cors.php](backend/config/cors.php) to read from `.env` file

### 2. Session Security
- **Problem:** Missing `SESSION_SECURE_COOKIE` for HTTPS
- **Solution:** Updated [config/session.php](backend/config/session.php) with default value

---

## 🔧 WHAT YOU NEED TO DO NOW

### Step 1: Update .env on Hostinger

SSH into your Hostinger account and edit `.env` file to add:

```env
SESSION_SECURE_COOKIE=true
```

This line must be added because your site uses HTTPS.

### Step 2: Clear Laravel Cache on Hostinger

**CRITICAL:** Run these commands via SSH:

```bash
cd domains/admirus.com.lk/public_html
php artisan config:clear
php artisan cache:clear
php artisan config:cache
```

### Step 3: Commit and Push Changes

```bash
git add .
git commit -m "Fix CORS and session configuration for production"
git push origin main
```

### Step 4: Pull on Hostinger

```bash
cd domains/admirus.com.lk/public_html
git pull origin main
php artisan config:clear
php artisan cache:clear
php artisan config:cache
```

---

## 🧪 TEST YOUR FIX

1. Open browser DevTools (F12) → Network tab
2. Go to your live site: https://admirus.com.lk
3. Try to save data (create company, post, etc.)
4. Check if API requests succeed (should see 200 status, not CORS errors)

---

## 📋 OPTIONAL: Database Host Alternative

If database still doesn't work after the above fixes, try changing in Hostinger .env:

```env
# Change from:
DB_HOST=127.0.0.1

# To:
DB_HOST=localhost
```

Then clear cache again:
```bash
php artisan config:clear && php artisan config:cache
```

---

## 📚 Complete Documentation

- [ENV_PRODUCTION.md](ENV_PRODUCTION.md) - Complete .env configuration
- [HOSTINGER_DEPLOYMENT.md](HOSTINGER_DEPLOYMENT.md) - Full deployment guide
- [deploy-hostinger.sh](deploy-hostinger.sh) - Automated deployment script

---

## 🆘 Still Not Working?

Check Laravel logs on Hostinger:
```bash
tail -f storage/logs/laravel.log
```

This will show any database connection errors or other issues.
