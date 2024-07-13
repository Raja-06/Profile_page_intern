import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProfileForm.css';

const ProfileForm = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [role, setRole] = useState('');
  const [details, setDetails] = useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
    experience: '',
    company: '',
    jobOpenings: ''
  });
  const navigate = useNavigate();

  const handleProfilePicChange = (e) => {
    setProfilePic(URL.createObjectURL(e.target.files[0]));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const profileData = { profilePic, role, details };
    axios.post('http://localhost:5000/api/profiles', profileData)
      .then(response => {
        console.log(response.data);
        navigate('/profile-details', { state: { profilePic, role, details } });
      })
      .catch(error => {
        console.error('There was an error creating the profile!', error);
      });
  };

  return (
    <div className="profile-page">
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="profile-pic-section">
          <label htmlFor="profile-pic" className="profile-pic-label">
            {profilePic ? (
              <img src={profilePic} alt="Profile Preview" className="profile-pic-preview" />
            ) : (
              <div className="profile-pic-placeholder">Click to select profile picture</div>
            )}
          </label>
          <input
            type="file"
            id="profile-pic"
            accept="image/*"
            onChange={handleProfilePicChange}
            className="profile-pic-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" id="name" name="name" className="form-input" required onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" id="email" name="email" className="form-input" required onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input type="tel" id="phone" name="phone" className="form-input" required onChange={handleInputChange} />
        </div>

        <div className="role-selection">
          <p>Choose your role</p>
          <label className="radio-label">
            <input type="radio" value="jobSeeker" checked={role === 'jobSeeker'} onChange={handleRoleChange} />
            Job Seeker
          </label>
          <label className="radio-label">
            <input type="radio" value="recruiter" checked={role === 'recruiter'} onChange={handleRoleChange} />
            Recruiter
          </label>
        </div>

        {role === 'jobSeeker' && (
          <div className="additional-info">
            <div className="form-group">
              <label htmlFor="skills" className="form-label">Skills</label>
              <textarea id="skills" name="skills" className="form-textarea" required onChange={handleInputChange}></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="experience" className="form-label">Experience</label>
              <textarea id="experience" name="experience" className="form-textarea" required onChange={handleInputChange}></textarea>
            </div>
          </div>
        )}

        {role === 'recruiter' && (
          <div className="additional-info">
            <div className="form-group">
              <label htmlFor="company" className="form-label">Company Name</label>
              <input type="text" id="company" name="company" className="form-input" required onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="jobOpenings" className="form-label">Job Openings</label>
              <textarea id="jobOpenings" name="jobOpenings" className="form-textarea" required onChange={handleInputChange}></textarea>
            </div>
          </div>
        )}

        <button type="submit" className="submit-button">Create Profile</button>
      </form>
    </div>
  );
};

export default ProfileForm;


