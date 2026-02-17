import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import { exportToCSV } from '../../utils/exportCSV';
import './Reports.css';

function Reports() {
  const [reportType, setReportType] = useState('attendance');

  const handleExport = () => {
    // Implement export logic
    const data = []; // Fetch actual data
    exportToCSV(data, `${reportType}-report`);
  };

  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-content">
        <Sidebar />
        <main className="main-content">
          <h1>Reports</h1>
          <div className="report-controls">
            <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
              <option value="attendance">Attendance Report</option>
              <option value="late-arrival">Late Arrival Report</option>
              <option value="absence">Absence Report</option>
            </select>
            <button onClick={handleExport} className="export-btn">
              Export to CSV
            </button>
          </div>
          <div className="report-content">
            {/* Report content goes here */}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Reports;
