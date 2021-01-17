import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Application from './components/Application/Application';
import Login from './components/Login';
import Register from './components/Register';
import Settings from './components/Settings';
import { AuthProvider } from './context/auth';
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
