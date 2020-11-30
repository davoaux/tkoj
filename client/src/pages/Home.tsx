import React, { useContext } from 'react';
import NavBar from '../components/layout/NavBar/NavBar';
import SideBar from '../components/layout/SideBar/SideBar';
import { AuthContext } from '../context/auth';

const Home: React.FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <NavBar />
      <SideBar />
      <h1>Welcome {user?.name}</h1>
    </>
  );
};

export default Home;
