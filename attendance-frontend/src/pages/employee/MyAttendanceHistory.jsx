import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import AttendanceTable from '../../components/attendance/AttendanceTable';
import { getAttendanceHistory } from '../../features/attendance/attendanceAPI';
import './AttendanceHistory.css';

function MyAttendanceHistory() {
  const user = useSelector((state) => state.auth.user);
  const records = useSelector((state) => state.attendance.attendanceRecords);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
    endDate: new Date(),
  });

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange((prev) => ({
      ...prev,
      [name]: new Date(value),
    }));
  };

  const fetchHistory = async () => {
    try {
      await getAttendanceHistory(user.id, dateRange.startDate, dateRange.endDate);
    } catch (error) {
      console.error('Failed to fetch attendance history:', error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-content">
        <Sidebar />
        <main className="main-content">
          <h1>My Attendance History</h1>
          <div className="filter-section">
            <input
              type="date"
              name="startDate"
              value={dateRange.startDate.toISOString().split('T')[0]}
              onChange={handleDateChange}
            />
            <input
              type="date"
              name="endDate"
              value={dateRange.endDate.toISOString().split('T')[0]}
              onChange={handleDateChange}
            />
            <button onClick={fetchHistory}>Filter</button>
          </div>
          <AttendanceTable records={records} />
        </main>
      </div>
    </div>
  );
}

export default MyAttendanceHistory;
