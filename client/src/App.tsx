import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/layout/NavBar/NavBar';
import { AuthProvider } from './context/auth';
import Routes from './routes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NavBar />
        <Routes />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
