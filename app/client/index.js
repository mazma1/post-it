import AppRoutes from './components/AppRoutes';

const React = require('react');
const ReactDOM = require('react-dom');
require('bootstrap-loader');

require('materialize-css/dist/css/materialize.min.css');
require('materialize-css/dist/js/materialize.min.js');
require('materialize-css/dist/fonts/roboto/Roboto-Bold.woff');
require('materialize-css/dist/fonts/roboto/Roboto-Bold.woff2');
require('materialize-css/dist/fonts/roboto/Roboto-Light.woff');
require('materialize-css/dist/fonts/roboto/Roboto-Light.woff2');
require('materialize-css/dist/fonts/roboto/Roboto-Medium.woff');
require('materialize-css/dist/fonts/roboto/Roboto-Medium.woff2');
require('materialize-css/dist/fonts/roboto/Roboto-Regular.woff');
require('materialize-css/dist/fonts/roboto/Roboto-Regular.woff2');
require('materialize-css/dist/fonts/roboto/Roboto-Thin.woff');
require('materialize-css/dist/fonts/roboto/Roboto-Thin.woff2');

// require('bootstrap-loader');

require('./static/scss/style.scss');

const Client = require('./components/Client');

// render component to DOM
ReactDOM.render(
  <Client />,
  document.getElementById('clientApp')
);
