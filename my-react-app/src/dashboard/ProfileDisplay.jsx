// UserProfileDisplay.jsx
import React from 'react';
import './layout.css'; // assuming profile-circle class is here

function UserProfileDisplay({ name = 'User', image = null }) {
  return (
    <div className="user-info">
      <div className="profile-circle">
        {image ? (
          <img src={image} alt="Profile" className="profile-img" />
        ) : (
          name.charAt(0)
        )}
      </div>
      <span className="profile-name"><strong>{name}</strong></span>
    </div>
  );
}

export default UserProfileDisplay;
