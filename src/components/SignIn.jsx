import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../components/styling/authForm.css';

function SignIn({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://weldon-backend-45e0a2dcb575.herokuapp.com/signin`, {
        username,
        password
      });
      const { token, id, username: loggedInUsername } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user_id', id);
      localStorage.setItem('username', loggedInUsername);
      onLogin(token, loggedInUsername);
      navigate('/'); 
    } catch (error) {
      console.error('Error signing in:', error);
      alert('Invalid credentials');
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Sign In</button>
    </form>
  );
}

export default SignIn;
