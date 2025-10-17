import React, { useState } from 'react';
import './ProfileSection.css';

const ProfileSection = () => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const menuItems = [
    { icon: '📅', text: 'My Bookings', action: () => console.log('Navigate to bookings') },
    { icon: '💳', text: 'Saved Cards & Payments', action: () => console.log('Navigate to payments') },
    { icon: '⚙️', text: 'Preferences', action: () => console.log('Navigate to preferences') },
    { icon: '👥', text: 'Invite Friends & Earn', action: () => console.log('Navigate to referrals') },
    { icon: '❓', text: 'Help & Support', action: () => console.log('Navigate to help') },
    { icon: 'ℹ️', text: 'About Charginguu', action: () => console.log('Navigate to about') },
  ];

  const handleLogout = () => {
    console.log('User logged out');
    // Add your logout logic here
    setShowLogoutConfirm(false);
  };

  const handleBack = () => {
    console.log('Navigate back');
    // Add your back navigation logic here
  };

  return (
    <div className="profile-section">
      {/* Header */}
      <div className="profile-header">
        <button className="back-button" onClick={handleBack}>
          ←
        </button>
        <h1 className="profile-title">Profile</h1>
        <div className="header-spacer"></div> {/* For alignment */}
      </div>

      {/* User Info Card */}
      <div className="user-info-card">
        <div className="profile-picture">
          <div className="profile-avatar">JD</div>
        </div>
        <h2 className="user-name">John Doe</h2>
        <p className="user-email">john.doe@example.com</p>
        <button className="edit-profile-btn">
          Edit Profile
        </button>
      </div>

      {/* Menu List */}
      <div className="menu-list">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="menu-item"
            onClick={item.action}
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-text">{item.text}</span>
            <span className="menu-arrow">›</span>
          </div>
        ))}
      </div>

      {/* Logout Button */}
      <div className="logout-section">
        <button
          className="logout-btn"
          onClick={() => setShowLogoutConfirm(true)}
        >
          Logout
        </button>
      </div>

      {/* Logout Confirmation Dialog */}
      {showLogoutConfirm && (
        <div className="dialog-overlay">
          <div className="dialog-content">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to logout?</p>
            <div className="dialog-actions">
              <button
                className="dialog-btn cancel-btn"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="dialog-btn confirm-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;