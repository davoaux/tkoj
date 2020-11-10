import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../Auth/Login/Login';
import Register from '../Auth/Register/Register';
import NavBar from '../NavBar/NavBar';
import Notes from '../Notes/Notes';
import './App.css';

const Home: React.FC = () => <h1>Home</h1>;

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
