# Quick Setup Guide

## Step 1: Database Setup (1 minute)

1. Open XAMPP Control Panel
2. Start **Apache** and **MySQL**
3. Open browser: http://localhost/phpmyadmin
4. Click "New" to create database
5. Name it: `role`
6. Click "Create"

✅ Database ready!

## Step 2: Backend Setup (3 minutes)

Open **Terminal 1** (PowerShell or CMD):

```powershell
# Navigate to project backend
cd C:\Users\Deshan\Documents\GitHub\LMS_Role\backend

# Install dependencies (takes 2-3 minutes)
composer install

# Generate app key
php artisan key:generate

# Create database tables
php artisan migrate

# Add demo users
php artisan db:seed

# Start server
php artisan serve
```

Leave this terminal open. Backend is running on: **http://localhost:8000**

## Step 3: Frontend Setup (2 minutes)

Open **Terminal 2** (new PowerShell or CMD):

```powershell
# Navigate to project frontend
cd C:\Users\Deshan\Documents\GitHub\LMS_Role\frontend

# Install dependencies (takes 1-2 minutes)
npm install

# Start React app
npm start
```

Leave this terminal open. Frontend will auto-open at: **http://localhost:3000**

## Step 4: Login and Test (30 seconds)

Browser will open automatically. Use these credentials:

**SuperAdmin**: superadmin@example.com / password123
**Admin**: admin@example.com / password123
**User**: user@example.com / password123

🎉 **You're done!** The system is ready to use.

## Daily Usage

To start working on the project:

**Terminal 1 (Backend)**:
```powershell
cd C:\Users\Deshan\Documents\GitHub\LMS_Role\backend
php artisan serve
```

**Terminal 2 (Frontend)**:
```powershell
cd C:\Users\Deshan\Documents\GitHub\LMS_Role\frontend
npm start
```

Don't forget to start XAMPP MySQL first!

## Testing the System

### As User
- ✅ Can see dashboard
- ✅ Can view own profile
- ❌ Cannot see user management

### As Admin
- ✅ Can see dashboard
- ✅ Can view all users
- ✅ Can edit users
- ❌ Cannot delete users

### As SuperAdmin
- ✅ Can see dashboard
- ✅ Can view all users
- ✅ Can edit users
- ✅ Can delete users

## Need Help?

**CORS Error?**
- Make sure both servers are running
- Check backend is on port 8000
- Check frontend is on port 3000

**Database Error?**
- Make sure XAMPP MySQL is running
- Make sure database "role" exists

**Port Already in Use?**
- Backend: `php artisan serve --port=8001`
- Frontend: Set PORT=3001 in environment

## API Test

Test backend is working:
```
http://localhost:8000/api/test
```

Should return: `{"message": "API is working!"}`
