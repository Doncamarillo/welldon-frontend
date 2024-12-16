import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../components/styling/projectDetails.css'

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const userId = localStorage.getItem('user_id');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/projects/${id}`);
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/projects/${id}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    if (id) {
      fetchProjectDetails();
      fetchComments();
    } else {
      console.error('Invalid project ID:', id);
    }
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/projects/${id}/comments`, {
        user_id: userId,
        text: commentText,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCommentText('');
      const response = await axios.get(`http://localhost:5000/projects/${id}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

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
        <p className="project-description">{project.description}</p>
        {project.image_url && <img src={project.image_url} alt={project.title} className="project-image" />}
        {userId === project.user_id.toString() && (
          <div className="project-actions">
            <button className="edit-button" onClick={() => navigate(`/edit-project/${id}`)}>Edit Project</button>
            <button className="delete-button" onClick={async () => {
              await axios.delete(`http://localhost:5000/projects/${id}`);
              navigate('/');
            }}>Delete Project</button>
          </div>
        )}
      </div>
      <div className="comments-section">
        <h2>Comments</h2>
        <form className="comment-form" onSubmit={handleAddComment}>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment"
            required
            className="comment-textarea"
          />
          <button type="submit" className="comment-button">Post Comment</button>
        </form>
        <ul className="comments-list">
          {comments.map(comment => (
            <li key={comment.id} className="comment-item">
              <p className="comment-text">{comment.text}</p>
              <small className="comment-meta">By {comment.username} on {new Date(comment.timestamp).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProjectDetails;
