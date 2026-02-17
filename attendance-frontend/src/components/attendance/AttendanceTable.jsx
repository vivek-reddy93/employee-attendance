import React from 'react';
import { formatDateTime } from '../../utils/dateUtils';
import './AttendanceTable.css';

function AttendanceTable({ records }) {
  return (
    <div className="table-container">
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Duration</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {records && records.length > 0 ? (
            records.map((record) => (
              <tr key={record.id}>
                <td>{formatDateTime(record.date)}</td>
                <td>{record.checkIn ? formatDateTime(record.checkIn) : '-'}</td>
                <td>{record.checkOut ? formatDateTime(record.checkOut) : '-'}</td>
                <td>{record.duration || '-'}</td>
                <td>
                  <span className={`status-badge ${record.status}`}>{record.status}</span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-data">
                No attendance records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceTable;
