import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import CheckInOutCard from '../../components/attendance/CheckInOutCard';
import { checkInAPI, checkOutAPI } from '../../features/attendance/attendanceAPI';
import './MarkAttendance.css';

function MarkAttendance() {
  const user = useSelector((state) => state.auth.user);
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);

  const handleCheckIn = async () => {
    try {
      await checkInAPI({ userId: user.id });
      setHasCheckedIn(true);
      setCheckInTime(new Date());
    } catch (error) {
      console.error('Check-in failed:', error);
    }
  };

  const handleCheckOut = async () => {
    try {
      await checkOutAPI(user.id);
      setHasCheckedIn(false);
    } catch (error) {
      console.error('Check-out failed:', error);
    }
  };

  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-content">
        <Sidebar />
        <main className="main-content">
          <h1>Mark Attendance</h1>
          <CheckInOutCard
            onCheckIn={handleCheckIn}
            onCheckOut={handleCheckOut}
            hasCheckedIn={hasCheckedIn}
          />
        </main>
      </div>
    </div>
  );
}

export default MarkAttendance;
