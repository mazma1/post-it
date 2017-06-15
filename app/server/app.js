const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const userRoute = require('./routes/user');
require('dotenv').config();

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Use all routes
app.use('/', userRoute);

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of PostIT!!!.',
}));

module.exports = app;