import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../auth/Login/Login';
import Register from '../auth/Register/Register';
import NavBar from '../layout/NavBar/NavBar';
import Home from '../pages/Home';
import Notes from '../pages/Notes';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/notes" component={Notes} />
      </Switch>
    </Router>
  );
};

export default App;
