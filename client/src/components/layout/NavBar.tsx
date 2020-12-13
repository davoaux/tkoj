import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const Logout: React.FC = () => {
  const { logout } = useAuth();
  const history = useHistory();

  const handleClick = (): void => {
    logout();
    history.push('/');
  };

  return <button onClick={handleClick}>Logout</button>;
};

const NavBar: React.FC = () => {
  const { isLogged } = useAuth();

  const styles = {
    navBar: {
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      height: '30px',
      padding: '20px',
      backgroundColor: '#111',
      fontWeight: 400,
      fontSize: '20px',
    },
    section: {
      color: '#FFF',
      marginRight: '15px',
      textDecoration: 'none',
    },
  };

  return (
    <div style={styles.navBar}>
      <Link to="/" style={styles.section}>
        TKOJ
      </Link>
      {isLogged ? <Logout /> : <Link to="/login">Login</Link>}
    </div>
  );
};

export default NavBar;
