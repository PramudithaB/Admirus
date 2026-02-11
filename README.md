# Role-Based Authentication System

A complete role-based authentication system with Laravel backend, React frontend, and MySQL database.

## Features

- **Token-based Authentication** using Laravel Sanctum
- **Three User Roles**: User, Admin, SuperAdmin
- **Role-based Access Control** with middleware
- **Protected Routes** on both backend and frontend
- **User Management** (Admin/SuperAdmin only)
- **Modern React UI** with responsive design

## Tech Stack

- **Backend**: Laravel 10 with Sanctum
- **Frontend**: React 18 with React Router
- **Database**: MySQL (XAMPP)
- **Authentication**: Token-based (Bearer tokens)

## Prerequisites

- PHP 8.1 or higher
- Composer
- Node.js 16+ and npm
- XAMPP (for MySQL)
- Git

## Installation Guide

### 1. Setup Database (XAMPP)

1. Start XAMPP Control Panel
2. Start Apache and MySQL services
3. Open phpMyAdmin (http://localhost/phpmyadmin)
4. Create a new database named `role`

### 2. Setup Backend (Laravel)

```bash
# Navigate to backend directory
cd backend

# Install PHP dependencies
composer install

# Generate application key
php artisan key:generate

# Run database migrations
php artisan migrate

# Seed database with demo users
php artisan db:seed

# Start Laravel development server
php artisan serve
```

The backend will run on: http://localhost:8000

### 3. Setup Frontend (React)

Open a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start React development server
npm start
```

The frontend will run on: http://localhost:3000

## Demo Credentials

After running the seeder, you can login with:

| Role | Email | Password |
|------|-------|----------|
| SuperAdmin | superadmin@example.com | password123 |
| Admin | admin@example.com | password123 |
| User | user@example.com | password123 |

## API Endpoints

**Production**: `https://admirus.com.lk/backend/public/api`
**Local Development**: `http://localhost:8000/api`

### Public Routes

- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /test` - Test API connection

### Protected Routes (Authenticated)

- `POST /api/logout` - Logout user
- `GET /api/me` - Get current user info
- `POST /api/change-password` - Change password
- `GET /api/users/{id}` - Get user by ID

### Admin & SuperAdmin Routes

- `GET /api/users` - Get all users
- `PUT /api/users/{id}` - Update user

### SuperAdmin Only Routes

- `DELETE /api/users/{id}` - Delete user

## Role Permissions

### User Role
- Access dashboard
- View own profile
- Change own password

### Admin Role
- All User permissions
- View all users
- Update any user
- Manage user status

### SuperAdmin Role
- All Admin permissions
- Delete users
- Full system access

## Project Structure

### Backend (Laravel)

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── AuthController.php
│   │   │   └── UserController.php
│   │   ├── Middleware/
│   │   │   └── CheckRole.php
│   │   └── Kernel.php
│   └── Models/
│       └── User.php
├── config/
│   ├── cors.php
│   └── sanctum.php
├── database/
│   ├── migrations/
│   │   ├── create_users_table.php
│   │   └── create_personal_access_tokens_table.php
│   └── seeders/
│       └── DatabaseSeeder.php
├── routes/
│   └── api.php
├── .env
└── composer.json
```

### Frontend (React)

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── api/
│   │   └── axios.js
│   ├── components/
│   │   └── ProtectedRoute.js
│   ├── context/
│   │   └── AuthContext.js
│   ├── pages/
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── Dashboard.js
│   │   ├── Users.js
│   │   └── Unauthorized.js
│   ├── styles/
│   │   ├── index.css
│   │   ├── Auth.css
│   │   ├── Dashboard.css
│   │   ├── Users.css
│   │   └── Unauthorized.css
│   ├── App.js
│   └── index.js
└── package.json
```

## Usage

### Login

1. Navigate to http://localhost:3000/login
2. Enter credentials (use demo credentials above)
3. Click "Login"

### Dashboard

After login, you'll see:
- User information
- Role badge
- Available permissions
- Admin actions (if admin/superadmin)

### User Management (Admin/SuperAdmin)

1. Login as Admin or SuperAdmin
2. Click "Manage Users" button
3. View all users in table format
4. Click "Edit" to update user details
5. Click "Delete" to remove user (SuperAdmin only)

### Register New User

1. Go to http://localhost:3000/register
2. Fill in the form
3. New users are created with "User" role by default

## Security Features

- Password hashing with bcrypt
- Token-based authentication
- CORS configuration
- Role-based middleware
- Protected API routes
- Frontend route guards
- Automatic token refresh handling

## Troubleshooting

### CORS Issues

If you get CORS errors, make sure:
- Backend CORS config allows `http://localhost:3000`
- Frontend axios is configured correctly
- Both servers are running

### Database Connection

If migrations fail:
- Check XAMPP MySQL is running
- Verify database name is `role`
- Check `.env` file has correct DB credentials

### Token Issues

If authentication doesn't work:
- Clear localStorage in browser
- Restart both servers
- Check token in localStorage (DevTools > Application)

## API Testing with Postman

### Login Request

```
POST http://localhost:8000/api/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password123"
}
```

### Authenticated Request

```
GET http://localhost:8000/api/users
Authorization: Bearer {your_token_here}
```

## Customization

### Adding New Roles

1. Update migration to add new role to enum
2. Update User model with helper methods
3. Update middleware to handle new role
4. Update frontend role checks

### Adding New Permissions

1. Create new API route in `routes/api.php`
2. Add appropriate middleware
3. Create controller method
4. Update frontend to show/hide features

## License

MIT License - Free to use for personal and commercial projects.

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review Laravel and React documentation
3. Check console for error messages
