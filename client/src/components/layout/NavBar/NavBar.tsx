import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../../context/auth';
import './NavBar.css';

const Logout: React.FC = () => {
  const { logout } = useAuth();
  const history = useHistory();

  const handleClick = () => {
    logout();
    history.push('/');
  };

  return <button onClick={handleClick}>Logout</button>;
};

const NavBar: React.FC = () => {
  return (
    <div className="navBar">
      <Link to="/" className="section">
        TKOJ
      </Link>
      <Logout />
    </div>
  );
};

export default NavBar;
