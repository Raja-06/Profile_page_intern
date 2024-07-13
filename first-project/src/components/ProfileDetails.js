import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ProfileDetails.css';

const ProfileDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { profilePic, role, details } = location.state;

  const handleEdit = () => {
    navigate('/');
  };

  return (
    <div className="profile-details-page">
      <div className="profile-details-container">
        <h1>Profile Created</h1>
        <div className="profile-details-card">
          <div className="profile-pic-section">
            {profilePic && <img src={profilePic} alt="Profile" className="profile-pic" />}
          </div>
          <div className="profile-info">
            <p><strong>Name:</strong> {details.name}</p>
            <p><strong>Email:</strong> {details.email}</p>
            <p><strong>Phone:</strong> {details.phone}</p>
            {role === 'jobSeeker' && (
              <div>
                <p><strong>Skills:</strong> {details.skills}</p>
                <p><strong>Experience:</strong> {details.experience}</p>
              </div>
            )}
            {role === 'recruiter' && (
              <div>
                <p><strong>Company Name:</strong> {details.company}</p>
                <p><strong>Job Openings:</strong> {details.jobOpenings}</p>
              </div>
            )}
          </div>
        </div>
        <button className="edit-button" onClick={handleEdit}>Edit Profile</button>
      </div>
    </div>
  );
};

export default ProfileDetails;
