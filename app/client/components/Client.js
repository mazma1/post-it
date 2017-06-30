import { BrowserRouter, HashRouter, Route, NavLink, Switch, Redirect } from 'react-router-dom';
import React from 'react';
import HomePage from './home-page/HomePage';
import MessageBoard from './message-board/MessageBoard';


// create a component
class Client extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/message_board" component={MessageBoard}/>
        </Switch>
      </HashRouter>
    );
  }
}

module.exports = Client;
