import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import WeeklyTrendChart from '../../components/charts/WeeklyTrendChart';
import DepartmentChart from '../../components/charts/DepartmentChart';
import './ManagerDashboard.css';

function ManagerDashboard() {
  const dispatch = useDispatch();
  const dashboardData = useSelector((state) => state.dashboard.dashboardData);

  useEffect(() => {
    // Fetch manager dashboard data
  }, [dispatch]);

  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-content">
        <Sidebar />
        <main className="main-content">
          <h1>Manager Dashboard</h1>
          <div className="dashboard-grid">
            <WeeklyTrendChart data={dashboardData} />
            <DepartmentChart data={dashboardData} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default ManagerDashboard;
