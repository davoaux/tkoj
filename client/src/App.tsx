import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/auth';
import Routes from './routes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
