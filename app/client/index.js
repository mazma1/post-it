import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import jwt from 'jsonwebtoken';
import rootReducer from './reducers/rootReducer';
import setAuthorizationToken from './utils/setAuthorizationToken';
import { setCurrentUser } from './actions/signinAction';
import Client from './components/Client';

require('bootstrap-loader');
require('materialize-loader');
require('./static/scss/style.scss');
require('../client/static/img/index-bg.png');


// Define Redux Store
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

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
