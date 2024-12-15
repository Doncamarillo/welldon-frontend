import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function UserProfile() {
  const { id } = useParams();
  const userId = id || localStorage.getItem('user_id');
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    const fetchUserProjects = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${userId}/projects`);
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
    <div>
      <h1>{user.username}</h1>
      {user.twitter && <p>Twitter: <a href={`https://x.com/${extractUsername(user.twitter)}`} target="_blank" rel="noopener noreferrer">{extractUsername(user.twitter)}</a></p>}
      {user.linkedin && <p>LinkedIn: <a href={`https://linkedin.com/in/${extractUsername(user.linkedin)}`} target="_blank" rel="noopener noreferrer">{extractUsername(user.linkedin)}</a></p>}
      {user.youtube && <p>YouTube: <a href={`https://youtube.com/@${extractUsername(user.youtube)}`} target="_blank" rel="noopener noreferrer">{extractUsername(user.youtube)}</a></p>}
      {user.github && <p>GitHub: <a href={`https://github.com/${extractUsername(user.github)}`} target="_blank" rel="noopener noreferrer">{extractUsername(user.github)}</a></p>}
      <h2>Projects</h2>
      <div>
        {projects.map((project) => (
          <div key={project.id}>
            <Link to={`/projects/${project.id}`}>
              <h3>{project.title}</h3>
            </Link>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
      <button><Link to="/edit-profile">Edit Profile</Link></button>
    </div>
  );
}

export default UserProfile;
