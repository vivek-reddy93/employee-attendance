import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import './Profile.css';

function Profile() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-content">
        <Sidebar />
        <main className="main-content">
          <h1>My Profile</h1>
          {user && (
            <div className="profile-card">
              <div className="profile-info">
                <p>
                  <strong>Name:</strong> {user.name}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Department:</strong> {user.department}
                </p>
                <p>
                  <strong>Role:</strong> {user.role}
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Profile;
