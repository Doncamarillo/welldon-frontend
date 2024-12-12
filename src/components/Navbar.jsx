import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ isAuthenticated, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">Home</Link>
        {isAuthenticated && (
          <Link to="/add-project">Add Project</Link>
        )}
      </div>
      <div className="navbar-center">
        <h1>welldon</h1>
      </div>
      <div className="navbar-right">
        {isAuthenticated ? (
          <>
            <Link to="/profile">Account</Link>
            <button onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
