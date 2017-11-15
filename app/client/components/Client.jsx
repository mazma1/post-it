import React from 'react';
import {
  Route,
  Switch,
  BrowserRouter } from 'react-router-dom';
import SignUp from './sign-up/SignUp';
import SignIn from './sign-in/SignIn';
import CheckAuth from '../components/CheckAuth';
import PageNotFound from '../components/PageNotFound';
import SearchUser from '../components/search/SearchForm';
import HomePageRedirect from '../components/HomePageRedirect';
import MessageBody from '../components/message-board/MessageBody';
import MessageBoard from '../components/message-board/MessageBoard';
import NewPassword from '../components/reset-password/NewPasswordForm';
import ResetPassword from '../components/reset-password/SubmitEmailForm';
import CreateGroup from '../components/client-frame/sidebar/CreateGroup';


if (module.hot) {
  module.hot.accept();
}

/**
 * Overarching Client Component
 *
 * @returns {ReactRouting} Definition of app routes
*/
function Client() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact path="/"
          component={HomePageRedirect}
        />
        <Route
          exact path="/signup"
          component={SignUp}
        />
        <Route
          exact path="/signin"
          component={SignIn}
        />
        <Route
          exact path="/message-board"
          component={CheckAuth(MessageBoard)}
        />
        <Route
          exact path="/message-board/create-group"
          component={CheckAuth(CreateGroup)}
        />
        <Route
          exact path="/message-board/:groupId"
          component={CheckAuth(MessageBoard)}
        />
        <Route
          exact path="/message-board/:groupId/message/:messageId"
          component={CheckAuth(MessageBody)}
        />
        <Route
          exact path="/search"
          component={CheckAuth(SearchUser)}
        />
        <Route
          path="/reset-password"
          component={ResetPassword}
        />
        <Route
          path="/new-password/:token"
          component={NewPassword}
        />
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default Client;
