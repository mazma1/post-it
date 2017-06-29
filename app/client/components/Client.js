import { BrowserRouter, HashRouter, Route, NavLink, Switch, Redirect } from 'react-router-dom';
import React from 'react';
import MessageBoard from './message-board/MessageBoard';


// create a component
class Client extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/message_board" component={MessageBoard}/>
        </Switch>
      </HashRouter>
    );
  }
}

module.exports = Client;
