import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap-loader';
import 'materialize-loader';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';
import configureStore from './store/configureStore';
import setAuthorizationToken from './utils/setAuthorizationToken';
import { setCurrentUser } from './actions/signIn';
import Client from './components/Client';
import '../../node_modules/toastr/build/toastr.min.css';
import './static/scss/style.scss';
import '../client/static/img/index-bg.png';
import '../client/static/img/google.jpg';


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
