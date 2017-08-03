import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './home-page/HomePage';
import SignUp from './sign-up/SignUp';
import SignIn from './sign-in/SignIn';
import MessageBoard from './message-board/MessageBoard';
import EnsureLoggedInContainer from '../components/EnsureLoggedInContainer';
import checkAuth from '../components/HomepageRedirectContainer';

if (module.hot) {
  module.hot.accept();
}

/**
 * Overarching Client Component
 * @returns {ReactRouting} Definition of app routes
*/
function Client() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={checkAuth(HomePage)}/>
        <Route exact path="/signup" component={SignUp}/>
        <Route exact path="/signin" component={SignIn}/>
        <EnsureLoggedInContainer>
          <Route exact path="/message_board" component={MessageBoard}/>
        </EnsureLoggedInContainer>
        <Route render={() => { return <p>Not Found</p>; }} />
      </Switch>
    </BrowserRouter>
  );
}

module.exports = Client;
