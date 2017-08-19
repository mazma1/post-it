import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';
import configureStore from './store/configureStore';
import setAuthorizationToken from './utils/setAuthorizationToken';
import { setCurrentUser } from './actions/signin';
import Client from './components/Client';

require('bootstrap-loader');
require('materialize-loader');
require('./static/scss/style.scss');
require('../client/static/img/index-bg.png');


// Define Redux Store
const store = configureStore();


// Persisting redux store
if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}

// render component to DOM
ReactDOM.render(
  <Provider store={store}>
    <Client />
  </Provider>,
  document.getElementById('clientApp')
);
