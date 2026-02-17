import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Sidebar.css';

function Sidebar() {
  const user = useSelector((state) => state.auth.user);

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {user?.role === 'employee' && (
          <>
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
            <Link to="/mark-attendance" className="nav-link">
              Mark Attendance
            </Link>
            <Link to="/attendance-history" className="nav-link">
              Attendance History
            </Link>
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
          </>
        )}
        {user?.role === 'manager' && (
          <>
            <Link to="/manager" className="nav-link">
              Dashboard
            </Link>
            <Link to="/all-attendance" className="nav-link">
              All Attendance
            </Link>
            <Link to="/team-calendar" className="nav-link">
              Team Calendar
            </Link>
            <Link to="/reports" className="nav-link">
              Reports
            </Link>
          </>
        )}
      </nav>
    </aside>
  );
}

export default Sidebar;
