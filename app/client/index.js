const React = require('react');
const ReactDOM = require('react-dom');

require('./scss/test.scss');

const Client = require('./components/Client');

// render component to DOM
ReactDOM.render(
  <Client />, // component invocation || creating an element
  document.getElementById('clientApp')
);
