import AppRoutes from './components/AppRoutes';

const React = require('react');
const ReactDOM = require('react-dom');

require('./scss/test.scss');

const Client = require('./components/Client');

// render component to DOM
ReactDOM.render(
  <AppRoutes />,
  document.getElementById('clientApp')
);
