# API Documentation

Base URL: `http://localhost:8000/api`

## Authentication

All protected endpoints require Bearer token in header:
```
Authorization: Bearer {your_token}
```

---

## Public Endpoints

### Register User
```http
POST /register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "password_confirmation": "password123",
  "role": "user" // optional: user, admin, superadmin
}
```

**Response (201)**:
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "is_active": true
  },
  "access_token": "1|abc123...",
  "token_type": "Bearer"
}
```

### Login
```http
POST /login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200)**:
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "is_active": true
  },
  "access_token": "1|abc123...",
  "token_type": "Bearer"
}
```

**Error Response (422)**:
```json
{
  "message": "The provided credentials are incorrect.",
  "errors": {
    "email": ["The provided credentials are incorrect."]
  }
}
```

### Test Connection
```http
GET /test
```

**Response (200)**:
```json
{
  "message": "API is working!"
}
```

---

## Protected Endpoints (All Authenticated Users)

### Logout
```http
POST /logout
Authorization: Bearer {token}
```

**Response (200)**:
```json
{
  "message": "Logged out successfully"
}
```

### Get Current User
```http
GET /me
Authorization: Bearer {token}
```

**Response (200)**:
```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "is_active": true,
    "created_at": "2024-01-15T10:00:00.000000Z",
    "updated_at": "2024-01-15T10:00:00.000000Z"
  }
}
```

### Get User by ID
```http
GET /users/{id}
Authorization: Bearer {token}
```

**Response (200)**:
```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "is_active": true
  }
}
```

### Change Password
```http
POST /change-password
Authorization: Bearer {token}
Content-Type: application/json

{
  "current_password": "oldpassword123",
  "new_password": "newpassword123",
  "new_password_confirmation": "newpassword123"
}
```

**Response (200)**:
```json
{
  "message": "Password changed successfully"
}
```

**Error Response (400)**:
```json
{
  "message": "Current password is incorrect"
}
```

---

## Admin & SuperAdmin Endpoints

### Get All Users
```http
GET /users
Authorization: Bearer {token}
```

**Roles Required**: admin, superadmin

**Response (200)**:
```json
{
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "is_active": true
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane@example.com",
      "role": "admin",
      "is_active": true
    }
  ]
}
```

### Update User
```http
PUT /users/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "John Updated",
  "email": "john.updated@example.com",
  "role": "admin",
  "is_active": false
}
```

**Roles Required**: admin, superadmin

**Response (200)**:
```json
{
  "message": "User updated successfully",
  "user": {
    "id": 1,
    "name": "John Updated",
    "email": "john.updated@example.com",
    "role": "admin",
    "is_active": false
  }
}
```

---

## SuperAdmin Only Endpoints

### Delete User
```http
DELETE /users/{id}
Authorization: Bearer {token}
```

**Roles Required**: superadmin

**Response (200)**:
```json
{
  "message": "User deleted successfully"
}
```

---

## Error Responses

### Unauthenticated (401)
```json
{
  "message": "Unauthenticated"
}
```

### Unauthorized (403)
```json
{
  "message": "Unauthorized. You do not have permission to access this resource."
}
```

### Validation Error (422)
```json
{
  "message": "The given data was invalid.",
  "errors": {
    "email": ["The email field is required."],
    "password": ["The password must be at least 8 characters."]
  }
}
```

### Not Found (404)
```json
{
  "message": "No query results for model [App\\Models\\User] 1"
}
```

---

## Role Permissions Matrix

| Endpoint | User | Admin | SuperAdmin |
|----------|------|-------|------------|
| POST /register | ✅ | ✅ | ✅ |
| POST /login | ✅ | ✅ | ✅ |
| POST /logout | ✅ | ✅ | ✅ |
| GET /me | ✅ | ✅ | ✅ |
| POST /change-password | ✅ | ✅ | ✅ |
| GET /users/{id} | ✅ | ✅ | ✅ |
| GET /users | ❌ | ✅ | ✅ |
| PUT /users/{id} | ❌ | ✅ | ✅ |
| DELETE /users/{id} | ❌ | ❌ | ✅ |

---

## Postman Collection

### Environment Variables
```
base_url = http://localhost:8000/api
token = (set after login)
```

### Example Workflow

1. **Register/Login** → Save token
2. **Get Current User** → Verify authentication
3. **Get All Users** → Test admin access
4. **Update User** → Test admin functionality
5. **Delete User** → Test superadmin functionality

---

## Rate Limiting

Default Laravel rate limiting:
- API routes: 60 requests per minute
- Can be configured in `app/Http/Kernel.php`

---

## CORS Configuration

Allowed origins: `http://localhost:3000`

To add more origins, edit `config/cors.php`:
```php
'allowed_origins' => [
    'http://localhost:3000',
    'https://yourdomain.com'
],
```
