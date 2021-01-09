import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const Logout: React.FC = () => {
  const { logout } = useAuth();
  const history = useHistory();

  const handleClick = () => {
    logout();
    history.push('/');
  };

  return (
    <button className="material-icons icon" onClick={handleClick}>
      settings
    </button>
  );
};

export default Logout;
