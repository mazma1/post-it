const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const userRoute = require('./routes/user');
const groupRoute = require('./routes/group');
require('dotenv').config();
const path = require('path');

// Set up the express app
const app = express();

if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));  // Log requests to the console.
}

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Use all routes
app.use('/', userRoute);
app.use('/', groupRoute);

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('../../webpack.config.js');
  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: '/dist/'
  }));
  app.use(webpackHotMiddleware(compiler, {
    log: false
    // path: '/__webpack_hmr'
  }));
}

app.use(express.static('../client/dist'));  // App still runs when commented out

app.get('*', (req, res) => res.status(200).sendFile(
  path.resolve(__dirname, '../client/dist/index.html')
));


module.exports = app;
