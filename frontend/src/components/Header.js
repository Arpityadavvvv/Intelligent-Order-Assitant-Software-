import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css'; // Assuming you have separate CSS for styling

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/" className="logo-link">
          <img src="https://via.placeholder.com/150" alt="Logo" className="logo-image" />
          <span className="logo-text">Order Assistant</span>
        </Link>
      </div>

      <nav className="navigation">
        <ul>
          <li>
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li>
            <Link to="/order-summary" className="nav-link">Order Summary</Link>
          </li>
          <li>
            <button className="nav-button">Contact Us</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
