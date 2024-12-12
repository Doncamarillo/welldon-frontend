import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function LandingPage() {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const isAuthenticated = localStorage.getItem('token');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchProjects();
    fetchUsers();
  }, []);

  return (
    <div className="landing-page">
      <main>
        <section className="trending-projects">
          <h2>Trending Projects</h2>
          <div className="projects-grid">
            {projects.slice(0, 5).map((project) => (
              <div key={project.id} className="project-card">
                <Link to={`/projects/${project.id}`}>
                  <h3>{project.title}</h3>
                </Link>
                <p>Created by {project.username}</p>
                {project.image_url && <img src={project.image_url} alt={project.title} />}
              </div>
            ))}
          </div>
        </section>
        <section className="trending-users">
          <h2>Trending Users</h2>
          <div className="users-grid">
            {users.slice(0, 5).map((user) => (
              <div key={user.id} className="user-card">
                <Link to={`/profile/${user.id}`}>
                  <h3>{user.username}</h3>
                </Link>
              </div>
            ))}
          </div>
        </section>
        {isAuthenticated && (
          <div className="add-project-button-container">
            <Link to="/add-project">
              <button className="add-project-button">Add New Project</button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

export default LandingPage;