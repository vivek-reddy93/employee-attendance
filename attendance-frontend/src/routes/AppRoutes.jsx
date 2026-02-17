import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';
import RoleBasedRoute from '../components/common/RoleBasedRoute';

// Auth pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

// Employee pages
import EmployeeDashboard from '../pages/employee/EmployeeDashboard';
import MarkAttendance from '../pages/employee/MarkAttendance';
import MyAttendanceHistory from '../pages/employee/MyAttendanceHistory';
import Profile from '../pages/employee/Profile';

// Manager pages
import ManagerDashboard from '../pages/manager/ManagerDashboard';
import AllAttendance from '../pages/manager/AllAttendance';
import TeamCalendar from '../pages/manager/TeamCalendar';
import Reports from '../pages/manager/Reports';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Employee routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={['employee']}>
                <EmployeeDashboard />
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/mark-attendance"
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={['employee']}>
                <MarkAttendance />
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendance-history"
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={['employee']}>
                <MyAttendanceHistory />
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={['employee']}>
                <Profile />
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        />

        {/* Manager routes */}
        <Route
          path="/manager"
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={['manager']}>
                <ManagerDashboard />
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/all-attendance"
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={['manager']}>
                <AllAttendance />
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/team-calendar"
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={['manager']}>
                <TeamCalendar />
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={['manager']}>
                <Reports />
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        />

        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
