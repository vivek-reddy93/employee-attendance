import React, { useState } from 'react';
import { getCalendarGrid, getMonthName, isSameDay } from '../../utils/dateUtils';
import { getStatusColor, getStatusBgColor } from '../../utils/statusUtils';
import './AttendanceCalendar.css';

/**
 * Attendance Calendar Component
 * Displays a month calendar with color-coded attendance status
 */
function AttendanceCalendar({
  attendanceData = [],
  currentMonth = new Date(),
  onMonthChange,
  onDateClick
}) {
  const [selectedDate, setSelectedDate] = useState(null);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const calendarGrid = getCalendarGrid(year, month);
  const monthName = getMonthName(currentMonth);

  // Create a map of dates to attendance status for quick lookup
  const attendanceMap = {};
  attendanceData.forEach(record => {
    const dateKey = new Date(record.date).toDateString();
    attendanceMap[dateKey] = record.status;
  });

  const handlePrevMonth = () => {
    const newMonth = new Date(year, month - 1, 1);
    onMonthChange && onMonthChange(newMonth);
  };

  const handleNextMonth = () => {
    const newMonth = new Date(year, month + 1, 1);
    onMonthChange && onMonthChange(newMonth);
  };

  const handleDateClick = (dateObj) => {
    if (!dateObj.isCurrentMonth) return;
    setSelectedDate(dateObj.date);
    onDateClick && onDateClick(dateObj.date);
  };

  const getDateStyle = (dateObj) => {
    const dateKey = dateObj.date.toDateString();
    const status = attendanceMap[dateKey];

    if (!status) return {};

    return {
      backgroundColor: getStatusBgColor(status),
      borderColor: getStatusColor(status),
      borderWidth: '2px',
      borderStyle: 'solid'
    };
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="attendance-calendar">
      <div className="calendar-header">
        <button className="calendar-nav-btn" onClick={handlePrevMonth}>‹</button>
        <h3 className="calendar-month-title">{monthName}</h3>
        <button className="calendar-nav-btn" onClick={handleNextMonth}>›</button>
      </div>

      <div className="calendar-weekdays">
        {weekDays.map(day => (
          <div key={day} className="calendar-weekday">{day}</div>
        ))}
      </div>

      <div className="calendar-grid">
        {calendarGrid.map((dateObj, index) => {
          const dateKey = dateObj.date.toDateString();
          const status = attendanceMap[dateKey];
          const isSelected = selectedDate && isSameDay(selectedDate, dateObj.date);
          const isToday = isSameDay(dateObj.date, new Date());

          return (
            <div
              key={index}
              className={`calendar-date ${!dateObj.isCurrentMonth ? 'calendar-date-other-month' : ''
                } ${isSelected ? 'calendar-date-selected' : ''} ${isToday ? 'calendar-date-today' : ''
                } ${status ? 'calendar-date-has-status' : ''}`}
              style={getDateStyle(dateObj)}
              onClick={() => handleDateClick(dateObj)}
            >
              <span className="calendar-date-number">{dateObj.date.getDate()}</span>
              {status && <span className="calendar-date-indicator" title={status}>•</span>}
            </div>
          );
        })}
      </div>

      <div className="calendar-legend">
        <div className="legend-item">
          <span className="legend-color" style={{ background: '#e8f5e9', border: '2px solid #4caf50' }}></span>
          <span>Present</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ background: '#ffebee', border: '2px solid #f44336' }}></span>
          <span>Absent</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ background: '#fff3e0', border: '2px solid #ff9800' }}></span>
          <span>Late/Half Day</span>
        </div>
      </div>
    </div>
  );
}

export default AttendanceCalendar;
