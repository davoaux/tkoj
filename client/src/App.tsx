import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/auth';
import Application from './pages/Application';
import Login from './pages/Login';
import Register from './pages/Register';
import Settings from './pages/Settings';
import UserRoute from './utils/UserRoute';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <UserRoute exact path="/settings" component={Settings} />
          <UserRoute exact path="/*" component={Application} />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
