import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import './NavBar.css';

const Logout: React.FC = () => {
  const { logout } = useAuth();
  const history = useHistory();

  const handleClick = () => {
    logout();
    history.push('/');
  };

  return (
    <button className="btn" onClick={handleClick}>
      Logout
    </button>
  );
};

const NavBar: React.FC = () => {
  return (
    <div className="navBar">
      <div>
        <Link to="/">TKOJ</Link>
      </div>
      <div>
        <input
          className="input-transparent"
          type="text"
          placeholder="todo search bar"
        />
      </div>
      <div>
        <Logout />
      </div>
    </div>
  );
};

export default NavBar;
