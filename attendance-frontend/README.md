# Attendance Management System - Frontend

A modern React-based frontend for an attendance management system with role-based access control for employees and managers.

## Features

- **Authentication**: Login and registration with role-based access
- **Employee Features**:
  - Mark attendance (Check-in/Check-out)
  - View attendance history
  - Personal dashboard with attendance trends
  - Profile management

- **Manager Features**:
  - View team attendance
  - Generate reports
  - Department statistics
  - Team calendar view
  - Export attendance data to CSV

## Tech Stack

- **Frontend Framework**: React 18
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Charts**: Recharts

## Project Structure

```
src/
├── app/                 # Redux store configuration
├── features/            # Redux slices for auth, attendance, dashboard
├── components/          # Reusable React components
│   ├── common/         # Common components (Navbar, Sidebar, etc.)
│   ├── charts/         # Chart components
│   └── attendance/     # Attendance-specific components
├── pages/              # Page components
│   ├── auth/          # Login and Register pages
│   ├── employee/      # Employee dashboard and features
│   └── manager/       # Manager dashboard and features
├── services/           # API service configurations
├── utils/              # Utility functions
└── routes/             # Route configuration
```

## Installation

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your API base URL
VITE_API_BASE_URL=http://localhost:5000/api
```

## Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Production

```bash
npm run build
npm run preview
```

## Environment Variables

- `VITE_API_BASE_URL`: Base URL for the backend API
- `VITE_APP_NAME`: Application name

## API Integration

The frontend expects the following API endpoints:

### Authentication
- `POST /auth/login`
- `POST /auth/register`
- `POST /auth/logout`
- `GET /auth/me`

### Attendance
- `POST /attendance/check-in`
- `PUT /attendance/check-out/:id`
- `GET /attendance/history`
- `GET /attendance/team`

### Dashboard
- `GET /dashboard`
- `GET /dashboard/weekly-trends`
- `GET /dashboard/department-stats`
- `GET /dashboard/employee/:userId`

## Authentication

The application uses JWT tokens for authentication. Tokens are stored in localStorage and automatically included in all API requests via the axios interceptor.

## Role-Based Access Control

- **Employee**: Can view personal dashboard, mark attendance, and view own history
- **Manager**: Can view team attendance, generate reports, and access administrative features

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

MIT
