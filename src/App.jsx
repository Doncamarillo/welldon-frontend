import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import './App.css';

function App() {
  const isAuthenticated = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');

  };

  return (
    <Router>
      <div>
        <Navbar isAuthenticated={isAuthenticated} username={username} onLogout={handleLogout} />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
