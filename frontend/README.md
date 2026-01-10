# LMS Frontend (React)

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Features

- **Role-based Authentication**: Login with different user roles
- **Protected Routes**: Role-specific dashboard access
- **Modern UI**: Clean and responsive interface
- **Quick Login**: Demo accounts for testing

## Demo Accounts

- **Super Admin**: superadmin@lms.com / password
- **Admin**: admin@lms.com / password
- **Teacher**: teacher@lms.com / password
- **Student**: student@lms.com / password

## Technology Stack

- React 18
- React Router v6
- Axios for API calls
- Context API for state management
- CSS3 with modern gradients

## Project Structure

```
src/
├── components/         # Reusable components
│   └── ProtectedRoute.js
├── context/           # React Context
│   └── AuthContext.js
├── pages/             # Page components
│   ├── Login.js
│   ├── AdminDashboard.js
│   ├── SuperAdminDashboard.js
│   ├── TeacherDashboard.js
│   └── StudentDashboard.js
├── App.js             # Main app component
└── index.js           # Entry point
```

## Available Scripts

- `npm start` - Run development server
- `npm build` - Build for production
- `npm test` - Run tests
