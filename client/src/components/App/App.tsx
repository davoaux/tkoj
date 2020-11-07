import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../Login/Login';
import Notes from '../Notes/Notes';
import './App.css';

const Home: React.FC = () => <h1>Home</h1>;

const App: React.FC = () => {
  return (
    <Router>
      <h1>TODO navbar</h1>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/notes">
          <Notes />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
