import React from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import AttendanceCalendar from '../../components/attendance/AttendanceCalendar';
import './TeamCalendar.css';

function TeamCalendar() {
  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-content">
        <Sidebar />
        <main className="main-content">
          <h1>Team Calendar</h1>
          <AttendanceCalendar />
        </main>
      </div>
    </div>
  );
}

export default TeamCalendar;
