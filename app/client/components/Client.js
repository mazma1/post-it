import { BrowserRouter, HashRouter, Route, NavLink, Switch, Redirect } from 'react-router-dom';
import React from 'react';
import HomePage from './home-page/HomePage';
import SignUp from './sign-up/SignUp';
import SignIn from './sign-in/SignIn';
import MessageBoard from './message-board/MessageBoard';




// create a component
class Client extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/signin" component={SignIn}/>
          <Route exact path="/message_board" component={MessageBoard}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

module.exports = Client;
