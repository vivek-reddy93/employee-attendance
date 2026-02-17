import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import StatsCard from '../../components/common/StatsCard';
import WeeklyTrendChart from '../../components/charts/WeeklyTrendChart';
import { fetchEmployeeDashboard } from '../../features/dashboard/dashboardSlice';
import { fetchTodayStatus, checkIn, checkOut } from '../../features/attendance/attendanceSlice';
import { formatDate, getFormattedTime, formatHours } from '../../utils/dateUtils';
import './EmployeeDashboard.css';

function EmployeeDashboard() {
  const dispatch = useDispatch();
  const { dashboardData, loading } = useSelector((state) => state.dashboard);
  const { todayAttendance } = useSelector((state) => state.attendance);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchEmployeeDashboard());
    dispatch(fetchTodayStatus());
  }, [dispatch]);

  const handleCheckIn = async () => {
    setActionLoading(true);
    try {
      await dispatch(checkIn()).unwrap();
      dispatch(fetchTodayStatus());
      dispatch(fetchEmployeeDashboard());
    } catch (error) {
      alert(error || 'Failed to check in');
    } finally {
      setActionLoading(false);
    }
  };

  const handleCheckOut = async () => {
    if (!todayAttendance?._id) return;
    setActionLoading(true);
    try {
      await dispatch(checkOut(todayAttendance._id)).unwrap();
      dispatch(fetchTodayStatus());
      dispatch(fetchEmployeeDashboard());
    } catch (error) {
      alert(error || 'Failed to check out');
    } finally {
      setActionLoading(false);
    }
  };

  const stats = dashboardData?.stats || {};
  const recentAttendance = dashboardData?.recentAttendance || [];

  const getTodayStatusText = () => {
    if (!todayAttendance) return 'Not Checked In';
    if (todayAttendance.checkOutTime) return 'Checked Out';
    return 'Checked In';
  };

  const getTodayStatusColor = () => {
    if (!todayAttendance) return 'red';
    if (todayAttendance.checkOutTime) return 'blue';
    return 'green';
  };

  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-content">
        <Sidebar />
        <main className="main-content">
          <div className="dashboard-header">
            <h1>Employee Dashboard</h1>
            <div className="quick-actions">
              {!todayAttendance && (
                <button
                  className="btn btn-primary"
                  onClick={handleCheckIn}
                  disabled={actionLoading}
                >
                  {actionLoading ? 'Processing...' : '✓ Check In'}
                </button>
              )}
              {todayAttendance && !todayAttendance.checkOutTime && (
                <button
                  className="btn btn-secondary"
                  onClick={handleCheckOut}
                  disabled={actionLoading}
                >
                  {actionLoading ? 'Processing...' : '✗ Check Out'}
                </button>
              )}
            </div>
          </div>

          {loading ? (
            <div className="loading">Loading dashboard...</div>
          ) : (
            <>
              {/* Stats Cards */}
              <div className="stats-grid">
                <StatsCard
                  title="Today's Status"
                  value={getTodayStatusText()}
                  icon="📅"
                  color={getTodayStatusColor()}
                  subtitle={todayAttendance?.checkInTime ?
                    `Checked in at ${getFormattedTime(todayAttendance.checkInTime)}` :
                    'Mark your attendance'}
                />
                <StatsCard
                  title="Present Days"
                  value={stats.presentDays || 0}
                  icon="✓"
                  color="green"
                  subtitle="This month"
                />
                <StatsCard
                  title="Absent Days"
                  value={stats.absentDays || 0}
                  icon="✗"
                  color="red"
                  subtitle="This month"
                />
                <StatsCard
                  title="Late Days"
                  value={stats.lateDays || 0}
                  icon="⚠"
                  color="orange"
                  subtitle="This month"
                />
                <StatsCard
                  title="Total Hours"
                  value={formatHours(stats.totalHours || 0)}
                  icon="⏱"
                  color="blue"
                  subtitle="This month"
                />
                <StatsCard
                  title="Attendance Rate"
                  value={`${stats.attendancePercentage || 0}%`}
                  icon="📊"
                  color="purple"
                  subtitle="This month"
                />
              </div>

              {/* Today's Details */}
              {todayAttendance && (
                <div className="today-details">
                  <h2>Today's Attendance</h2>
                  <div className="attendance-details-card">
                    <div className="detail-row">
                      <span className="detail-label">Check In:</span>
                      <span className="detail-value">
                        {getFormattedTime(todayAttendance.checkInTime)}
                      </span>
                    </div>
                    {todayAttendance.checkOutTime && (
                      <>
                        <div className="detail-row">
                          <span className="detail-label">Check Out:</span>
                          <span className="detail-value">
                            {getFormattedTime(todayAttendance.checkOutTime)}
                          </span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Total Hours:</span>
                          <span className="detail-value">
                            {formatHours(todayAttendance.totalHours)}
                          </span>
                        </div>
                      </>
                    )}
                    <div className="detail-row">
                      <span className="detail-label">Status:</span>
                      <span className={`status-badge status-${todayAttendance.status}`}>
                        {todayAttendance.status}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Weekly Trend */}
              {dashboardData?.weeklyTrend && (
                <div className="chart-section">
                  <h2>Weekly Attendance Trend</h2>
                  <WeeklyTrendChart data={dashboardData.weeklyTrend} />
                </div>
              )}

              {/* Recent Attendance */}
              <div className="recent-attendance">
                <h2>Recent Attendance (Last 7 Days)</h2>
                {recentAttendance.length > 0 ? (
                  <div className="attendance-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Check In</th>
                          <th>Check Out</th>
                          <th>Hours</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentAttendance.map((record) => (
                          <tr key={record._id}>
                            <td>{formatDate(record.date)}</td>
                            <td>{getFormattedTime(record.checkInTime)}</td>
                            <td>{record.checkOutTime ? getFormattedTime(record.checkOutTime) : '-'}</td>
                            <td>{formatHours(record.totalHours)}</td>
                            <td>
                              <span className={`status-badge status-${record.status}`}>
                                {record.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="no-data">No recent attendance records</p>
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
