import React from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import Login from '../Login/Login';
import Notes from '../Notes/Notes';
import './App.css';

function Home() {
  return <h1>Home</h1>;
}

export default function App() {
  return (
    <Router>
      <h1>navbar</h1>
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
}
