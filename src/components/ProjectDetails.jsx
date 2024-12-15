import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    <div>
      <h1>
        <a href={project.deployed_url} target="_blank" rel="noopener noreferrer">
          {project.title}
        </a>
      </h1>
      <p>Created by <Link to={`/profile/${project.user_id}`}>{project.username}</Link></p>
      <p>{project.description}</p>
      {project.image_url && <img src={project.image_url} alt={project.title} />}
      {userId === project.user_id.toString() && (
        <>
          <button onClick={() => navigate(`/edit-project/${id}`)}>Edit Project</button>
          <button onClick={async () => {
            await axios.delete(`http://localhost:5000/projects/${id}`);
            navigate('/');
          }}>Delete Project</button>
        </>
      )}
      <div className="comments-section">
        <h2>Comments</h2>
        <form onSubmit={handleAddComment}>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment"
            required
          />
          <button type="submit">Post Comment</button>
        </form>
        <ul>
          {comments.map(comment => (
            <li key={comment.id}>
              <p>{comment.text}</p>
              <small>By {comment.username} on {new Date(comment.timestamp).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProjectDetails;
