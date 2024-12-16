import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../components/styling/userProfileForm.css';
import settingsIcon from '../assets/settings-icon.png';

function UserProfile() {
  const { id } = useParams();
  const userId = id || localStorage.getItem('user_id');
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`https://weldon-backend-45e0a2dcb575.herokuapp.com/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    const fetchUserProjects = async () => {
      try {
        const response = await axios.get('https://weldon-backend-45e0a2dcb575.herokuapp.com/users/${userId}/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching user projects:', error);
      }
    };

    fetchUserProfile();
    fetchUserProjects();
  }, [userId]);

  const extractUsername = (url) => {
    if (!url) return '';
    const parts = url.split('/');
    return parts[parts.length - 1] || url;
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="user-profile">
      <div className="profile-header">
        {user.profile_picture && <img src={user.profile_picture} alt={`${user.username}'s profile`} className="profile-picture" />}
        <h1 className="username">{user.username}</h1>
        <img
          src={settingsIcon}
          alt="Settings"
          className="settings-icon"
          onClick={() => navigate('/edit-profile')}
        />
      </div>
      {user.twitter && <p>Twitter: <a href={`https://x.com/${extractUsername(user.twitter)}`} target="_blank" rel="noopener noreferrer">{extractUsername(user.twitter)}</a></p>}
      {user.linkedin && <p>LinkedIn: <a href={`https://linkedin.com/in/${extractUsername(user.linkedin)}`} target="_blank" rel="noopener noreferrer">{extractUsername(user.linkedin)}</a></p>}
      {user.youtube && <p>YouTube: <a href={`https://youtube.com/@${extractUsername(user.youtube)}`} target="_blank" rel="noopener noreferrer">{extractUsername(user.youtube)}</a></p>}
      {user.github && <p>GitHub: <a href={`https://github.com/${extractUsername(user.github)}`} target="_blank" rel="noopener noreferrer">{extractUsername(user.github)}</a></p>}
      <h2 className="projects-heading">Projects</h2>
      <div className="projects-list">
        {projects.map((project) => (
          <div key={project.id} className="project-item">
            <Link to={`/projects/${project.id}`}>
              <h3>{project.title}</h3>
              {project.image_url && <img src={project.image_url} alt={project.title} className="project-image" />}
            </Link>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserProfile;
