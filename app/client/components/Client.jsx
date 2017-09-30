import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignUp from './sign-up/SignUp';
import SignIn from './sign-in/SignIn';
import HomePageRedirect from '../components/HomepageRedirect';
import PageNotFound from '../components/PageNotFound';
import ResetPassword from '../components/reset-password/EnterEmailForm';
import NewPassword from '../components/reset-password/NewPasswordForm';
import SearchUser from '../components/search/SearchForm';
import MessageBody from '../components/message-board/MessageBody';
import MessageBoard from '../components/message-board/MessageBoard';
import requireAuth from '../../utils/requireAuth';

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
        <Route exact path="/" component={HomePageRedirect} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/message-board" component={requireAuth(MessageBoard)} />
        <Route path="/message-board/:groupId" component={requireAuth(MessageBoard)} />
        <Route path="/message/:messageId" component={requireAuth(MessageBody)} />
        <Route exact path="/search" component={requireAuth(SearchUser)} />
        <Route path="/reset-password" component={ResetPassword} />
        <Route path="/new-password/:token" component={NewPassword} />
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default Client;
