import { BrowserRouter, HashRouter, Route, NavLink, Switch, Redirect } from 'react-router-dom';
import React from 'react';
import HomePage from './home-page/HomePage';
import SignUpForm from './auth/SignupForm';
import SignInForm from './auth/SigninForm';
import MessageBoard from './message-board/MessageBoard';


// create a component
class Client extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/signup" component={SignUpForm}/>
          <Route exact path="/signin" component={SignInForm}/>
          <Route exact path="/message_board" component={MessageBoard}/>
        </Switch>
      </HashRouter>
    );
  }
}

module.exports = Client;
