# Additional .env Settings for Production (Hostinger)

Add these lines to your .env file on Hostinger:

```env
# Session Security (REQUIRED for HTTPS)
SESSION_SECURE_COOKIE=true

# CORS Configuration - Accept both local and production
CORS_ALLOWED_ORIGINS=http://localhost:3000,https://admirus.com.lk,https://www.admirus.com.lk

# Sanctum Configuration
SANCTUM_STATEFUL_DOMAINS=admirus.com.lk,www.admirus.com.lk
SESSION_DOMAIN=.admirus.com.lk
```

## Current Issues Fixed:

1. **CORS Configuration** - Updated to read from environment variables
2. **Session Security** - Now supports HTTPS secure cookies

## Your Updated .env Should Include:

```env
APP_NAME=Laravel
APP_ENV=production
APP_KEY=base64:4mTuS98e7unJ6Os7K1riB3wJURVheyQxK4AmpnqQdSs=
APP_DEBUG=false
APP_URL=https://admirus.com.lk

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=error

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=u849780045_admirus
DB_USERNAME=u849780045_admirus
DB_PASSWORD=2YJb6+lQ

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120
SESSION_SECURE_COOKIE=true

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_HOST=
PUSHER_PORT=443
PUSHER_SCHEME=https
PUSHER_APP_CLUSTER=mt1

VITE_APP_NAME="${APP_NAME}"
VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
VITE_PUSHER_HOST="${PUSHER_HOST}"
VITE_PUSHER_PORT="${PUSHER_PORT}"
VITE_PUSHER_SCHEME="${PUSHER_SCHEME}"
VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"

SANCTUM_STATEFUL_DOMAINS=admirus.com.lk,www.admirus.com.lk
SESSION_DOMAIN=.admirus.com.lk
CORS_ALLOWED_ORIGINS=http://localhost:3000,https://admirus.com.lk,https://www.admirus.com.lk
```

## If DB_HOST=127.0.0.1 doesn't work:

Some Hostinger configurations require:
```env
DB_HOST=localhost
```

Try this alternative if database connection issues persist.
