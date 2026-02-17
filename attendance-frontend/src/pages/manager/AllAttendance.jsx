import React, { useEffect, useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import AttendanceTable from '../../components/attendance/AttendanceTable';
import { getTeamAttendance } from '../../features/attendance/attendanceAPI';
import './AllAttendance.css';

function AllAttendance() {
  const [teamRecords, setTeamRecords] = useState([]);
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

  const fetchTeamAttendance = async () => {
    try {
      const response = await getTeamAttendance(dateRange.startDate, dateRange.endDate);
      setTeamRecords(response);
    } catch (error) {
      console.error('Failed to fetch team attendance:', error);
    }
  };

  useEffect(() => {
    fetchTeamAttendance();
  }, []);

  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-content">
        <Sidebar />
        <main className="main-content">
          <h1>Team Attendance</h1>
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
            <button onClick={fetchTeamAttendance}>Filter</button>
          </div>
          <AttendanceTable records={teamRecords} />
        </main>
      </div>
    </div>
  );
}

export default AllAttendance;
