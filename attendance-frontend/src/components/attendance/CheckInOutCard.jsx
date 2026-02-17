import React, { useState } from 'react';
import './CheckInOutCard.css';

function CheckInOutCard({ onCheckIn, onCheckOut, hasCheckedIn }) {
  const [loading, setLoading] = useState(false);

  const handleCheckIn = async () => {
    setLoading(true);
    try {
      await onCheckIn();
    } catch (error) {
      console.error('Check-in failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    setLoading(true);
    try {
      await onCheckOut();
    } catch (error) {
      console.error('Check-out failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="check-in-out-card">
      <h3>Today's Attendance</h3>
      <div className="current-time">
        {new Date().toLocaleTimeString('en-US')}
      </div>
      <div className="button-group">
        <button
          onClick={handleCheckIn}
          disabled={hasCheckedIn || loading}
          className="check-in-btn"
        >
          {loading ? 'Processing...' : 'Check In'}
        </button>
        <button
          onClick={handleCheckOut}
          disabled={!hasCheckedIn || loading}
          className="check-out-btn"
        >
          {loading ? 'Processing...' : 'Check Out'}
        </button>
      </div>
    </div>
  );
}

export default CheckInOutCard;
