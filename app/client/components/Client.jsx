import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignUp from './sign-up/SignUp.jsx';
import SignIn from './sign-in/SignIn.jsx';
import EnsureUserLoggedIn from '../components/EnsureLoggedIn.jsx';
import HomePageRedirect from '../components/HomepageRedirect.jsx';
import PageNotFound from '../components/PageNotFound.jsx';
import ResetPassword from '../components/reset-password/EnterEmailForm.jsx';
import NewPassword from '../components/reset-password/NewPasswordForm.jsx';
import SearchUser from '../components/search/SearchForm.jsx';
import MessageBody from '../components/message-board/MessageBody.jsx';

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
        <Route exact path="/" component={HomePageRedirect} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/message-board" component={EnsureUserLoggedIn} />
        <Route path="/message/:messageId" component={MessageBody} />
        <Route exact path="/search" component={SearchUser} />
        <Route path="/reset-password" component={ResetPassword} />
        <Route path="/new-password/:token" component={NewPassword} />
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default Client;
