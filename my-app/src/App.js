import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import NewGame from './components/newGame';
import Game from './components/game';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/game">
            <Game />
          </Route>
          <Route path="/">
            <NewGame />
          </Route>
        </Switch>
      </Router>
    )
  }
}
