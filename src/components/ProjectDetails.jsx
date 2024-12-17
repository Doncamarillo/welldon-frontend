import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../components/styling/projectDetails.css';

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const userId = localStorage.getItem('user_id');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`https://weldon-backend-45e0a2dcb575.herokuapp.com/projects/${id}`);
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    if (id) {
      fetchProjectDetails();
    } else {
      console.error('Invalid project ID:', id);
    }
  }, [id]);

  if (!project) {
    return <p>Loading...</p>;
  }

  return (
    <div className="project-details">
      <div className="project-header">
        <h1 className="project-title">
          <a href={project.deployed_url} target="_blank" rel="noopener noreferrer">
            {project.title}
          </a>
        </h1>
        <p className="project-creator">Created by <Link to={`/profile/${project.user_id}`}>{project.username}</Link></p>
        
        {project.image_url && <img src={project.image_url} alt={project.title} className="project-image" />}
        
        <p className="project-description">{project.description}</p>

        {userId === project.user_id.toString() && (
          <div className="project-actions">
            <button className="edit-button" onClick={() => navigate(`/edit-project/${id}`)}>Edit Project</button>
            <button className="delete-button" onClick={async () => {
              await axios.delete(`https://weldon-backend-45e0a2dcb575.herokuapp.com/projects/${id}`);
              navigate('/');
            }}>Delete Project</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectDetails;
