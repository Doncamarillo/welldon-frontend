import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';
import ProjectDetails from './components/ProjectDetails';
import ProjectForm from './components/ProjectForm';
import UserProfile from './components/UserProfile';
import UserProfileForm from './components/UserProfileForm';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    if (token && storedUsername) {
      setIsAuthenticated(true);
      setUsername(storedUsername);
    }
  }, []);

  const handleLogin = (token, username) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    setIsAuthenticated(true);
    setUsername(username);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    setUsername('');
  };

  return (
    <Router>
      <div>
        <Navbar isAuthenticated={isAuthenticated} username={username} onLogout={handleLogout} />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUp onLogin={handleLogin} />} />
            <Route path="/signin" element={<SignIn onLogin={handleLogin} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/add-project" element={<ProjectForm />} />
            <Route path="/edit-project/:id" element={<ProjectForm />} /> 
            <Route path="/profile/:id" element={<UserProfile />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/edit-profile" element={<UserProfileForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
