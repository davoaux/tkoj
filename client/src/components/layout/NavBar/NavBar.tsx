import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../../context/auth';
// import isAuthenticated from '../../../services/auth';
import './NavBar.css';

const Logout: React.FC = () => {
  const { logout } = useContext(AuthContext);
  const history = useHistory();

  const handleClick = (): void => {
    logout();
    history.push('/');
  };

  return <button onClick={handleClick}>Logout</button>;
};

const NavBar: React.FC = () => {
  const { isLogged } = useContext(AuthContext);

  return (
    <div className="NavBar">
      <Link to="/">Home</Link>
      <Link to="/notes">Notes</Link>
      {isLogged ? <Logout /> : <Link to="/login">Login</Link>}
    </div>
  );
};

export default NavBar;
