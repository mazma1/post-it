import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import setAuthorizationToken from './utils/setAuthorizationToken';


require('bootstrap-loader');
require('materialize-loader');
require('./static/scss/style.scss');
require('../client/static/img/index-bg.png');
// require('../client/validations/signup.js');

const Client = require('./components/Client');

// Define Redux Store
const store = createStore(
  (state = {}) => state,
  applyMiddleware(thunk)
);

setAuthorizationToken(localStorage.jwtToken);


// render component to DOM
ReactDOM.render(
  <Provider store={store}>
    <Client />
  </Provider>,
  document.getElementById('clientApp')
);
