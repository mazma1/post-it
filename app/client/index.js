const React = require('react');
const ReactDOM = require('react-dom');

require('bootstrap-loader');
require('materialize-loader');
require('./static/scss/style.scss');
require('../client/static/img/index-bg.png');


const Client = require('./components/Client');

// render component to DOM
ReactDOM.render(
  <Client />,
  document.getElementById('clientApp')
);
