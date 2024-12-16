import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../components/styling/navbar.css'

function Navbar({ isAuthenticated, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    onLogout();
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="hamburger" onClick={handleMenuToggle}>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>
      <div className="navbar-center">
        <Link to="/">Weldon</Link>
      </div>
      {menuOpen && (
        <div className="menu-overlay">
          <button className="close-button" onClick={handleMenuToggle}>×</button>
          <div className="menu-content">
            <Link to="/" onClick={handleMenuToggle}>Home</Link>
            {isAuthenticated && (
              <Link to="/add-project" onClick={handleMenuToggle}>Add Project</Link>
            )}
            {isAuthenticated ? (
              <>
                <Link to="/profile" onClick={handleMenuToggle}>Account</Link>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/signin" onClick={handleMenuToggle}>Sign In</Link>
                <Link to="/signup" onClick={handleMenuToggle}>Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
