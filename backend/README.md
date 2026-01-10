# LMS Backend (Laravel)

## Setup Instructions

1. Install dependencies:
```bash
composer install
```

2. Copy environment file:
```bash
copy .env.example .env
```

3. Generate application key:
```bash
php artisan key:generate
```

4. Configure database in `.env` file:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=lms_db
DB_USERNAME=root
DB_PASSWORD=
```

5. Run migrations:
```bash
php artisan migrate
```

6. Seed database with test users:
```bash
php artisan db:seed
```

7. Start the development server:
```bash
php artisan serve
```

## Test Users

After seeding, you can login with these credentials:

- **Super Admin**: superadmin@lms.com / password
- **Admin**: admin@lms.com / password
- **Teacher**: teacher@lms.com / password
- **Student**: student@lms.com / password

## API Endpoints

### Public Routes
- `POST /api/login` - Login
- `POST /api/register` - Register new user

### Protected Routes (require authentication)
- `POST /api/logout` - Logout
- `GET /api/profile` - Get user profile
- `GET /api/super-admin/dashboard` - Super Admin only
- `GET /api/admin/dashboard` - Admin & Super Admin
- `GET /api/teacher/dashboard` - Teacher only
- `GET /api/student/dashboard` - Student only

## Roles

- `super_admin` - Highest level access
- `admin` - Administrative access
- `teacher` - Teacher access
- `student` - Student access
