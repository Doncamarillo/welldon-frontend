import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../components/styling/projectForm.css'

function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [deployedUrl, setDeployedUrl] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    setUserId(storedUserId);

    if (id) {
      const fetchProjectDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/projects/${id}`);
          const project = response.data;
          setTitle(project.title);
          setDescription(project.description);
          setImageUrl(project.image_url);
          setDeployedUrl(project.deployed_url);
        } catch (error) {
          console.error('Error fetching project details:', error);
        }
      };
      fetchProjectDetails();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      if (id) {
        await axios.put(`http://localhost:5000/projects/${id}`, {
          title,
          description,
          image_url: imageUrl,
          deployed_url: deployedUrl,
          user_id: userId,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Project updated successfully');
        navigate(`/projects/${id}`);
      } else {
        const response = await axios.post('http://localhost:5000/projects', {
          title,
          description,
          image_url: imageUrl,
          deployed_url: deployedUrl,
          user_id: userId,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Project added successfully');
        navigate(`/projects/${response.data.id}`);
      }
    } catch (error) {
      console.error('Error submitting project:', error);
    }
  };

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      <h2>{id ? 'Edit Project' : 'Add New Project'}</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Project Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Project Description"
        required
      />
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Image URL"
        required
      />
      <input
        type="text"
        value={deployedUrl}
        onChange={(e) => setDeployedUrl(e.target.value)}
        placeholder="Deployed URL"
        required
      />
      <button type="submit" className="submit-button">{id ? 'Update Project' : 'Add Project'}</button>
    </form>
  );
}

export default ProjectForm;
