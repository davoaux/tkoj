import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './layout/NavBar/NavBar';
import Routes from './routes/Routes';

const App: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <Routes />
    </Router>
  );
};

export default App;
