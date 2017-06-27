import { BrowserRouter, HashRouter, Route, NavLink, Switch, Redirect } from 'react-router-dom';
import React from 'react';
import ClientFrame from './ClientFrame';
import Test from './Test';


// create a component
class Client extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/test" component={Test}/>
        </Switch>
      </HashRouter>
    );
  }
}

module.exports = Client;
