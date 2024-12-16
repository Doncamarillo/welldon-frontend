import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../components/styling/userProfileForm.css'

function UserProfileForm() {
  const [twitter, setTwitter] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [youtube, setYoutube] = useState('');
  const [github, setGithub] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userId = localStorage.getItem('user_id');
      try {
        const response = await axios.get(`http://localhost:5000/users/${userId}`);
        const { twitter, linkedin, youtube, github, profile_picture } = response.data;
        setTwitter(twitter || '');
        setLinkedin(linkedin || '');
        setYoutube(youtube || '');
        setGithub(github || '');
        setProfilePicture(profile_picture || '');
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('user_id');
    try {
      await axios.put(`http://localhost:5000/users/${userId}`, {
        twitter,
        linkedin,
        youtube,
        github,
        profile_picture: profilePicture,
      });
      setMessage('Profile updated successfully');
      navigate('/profile'); 
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile');
    }
  };

  return (
    <form className="user-profile-form" onSubmit={handleSubmit}>
      <h2>Update Profile</h2>
      <div className="form-group">
        <label htmlFor="profilePicture">Profile Picture URL</label>
        <input
          id="profilePicture"
          type="text"
          value={profilePicture}
          onChange={(e) => setProfilePicture(e.target.value)}
          placeholder="Profile Picture URL"
        />
      </div>
      <div className="form-group">
        <label htmlFor="twitter">Twitter URL</label>
        <input
          id="twitter"
          type="text"
          value={twitter}
          onChange={(e) => setTwitter(e.target.value)}
          placeholder="Twitter URL"
        />
      </div>
      <div className="form-group">
        <label htmlFor="linkedin">LinkedIn Username</label>
        <input
          id="linkedin"
          type="text"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          placeholder="LinkedIn Username"
        />
      </div>
      <div className="form-group">
        <label htmlFor="youtube">YouTube</label>
        <input
          id="youtube"
          type="text"
          value={youtube}
          onChange={(e) => setYoutube(e.target.value)}
          placeholder="YouTube URL"
        />
      </div>
      <div className="form-group">
        <label htmlFor="github">GitHub Username</label>
        <input
          id="github"
          type="text"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
          placeholder="GitHub Username"
        />
      </div>
      <button type="submit" className="submit-button">Update Profile</button>
      {message && <p className="message">{message}</p>}
    </form>
  );
}

export default UserProfileForm;
