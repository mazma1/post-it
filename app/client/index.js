const React = require('react');
const ReactDOM = require('react-dom');

require('bootstrap-loader');
require('materialize-loader');
require('./static/scss/style.scss');
require('../../node_modules/jquery/dist/jquery.min');


const Client = require('./components/Client');

// render component to DOM
ReactDOM.render(
  <Client />,
  document.getElementById('clientApp')
);
