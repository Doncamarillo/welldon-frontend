import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp, signIn } from '../api'; 
import '../components/styling/authForm.css';

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const signUpResponse = await signUp(username, email, password);
      const signInResponse = await signIn(email, password);
      localStorage.setItem('token', signInResponse.token);
      localStorage.setItem('user_id', signInResponse.user_id);

      setMessage('Sign-up and login successful!');
      navigate('/'); 
    } catch (error) {
      setMessage(error.error || 'An error occurred during sign-up or login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Signing Up...' : 'Sign Up'}
      </button>
      {message && <p className={message.includes('error') ? 'error-message' : 'success-message'}>{message}</p>}
    </form>
  );
}

export default SignUp;
