import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignUp from './sign-up/SignUp';
import SignIn from './sign-in/SignIn';
import EnsureUserLoggedIn from '../components/EnsureLoggedInContainer';
import HomePageRedirect from '../components/HomepageRedirectContainer';
import PageNotFound from '../components/PageNotFound';
import ResetPassword from '../components/reset-password/EnterEmailForm';
import NewPassword from '../components/reset-password/NewPasswordForm';

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
        <Route exact path="/" component={HomePageRedirect}/>
        <Route exact path="/signup" component={SignUp}/>
        <Route exact path="/signin" component={SignIn}/>
        <Route exact path="/message_board" component={EnsureUserLoggedIn}/>
        <Route path="/reset_password" component={ResetPassword}/>
        <Route path="/newpassword/:token" component={NewPassword}/>
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default Client;
