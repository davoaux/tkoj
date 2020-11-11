import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar: React.FC = () => {
  return (
    <div className="NavBar">
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Sign Up</Link>
      <Link to="/notes">Notes</Link>
    </div>
  );
};

export default NavBar;
