import express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import userRoute from './routes/user';
import groupRoute from './routes/group';
import messageRoute from './routes/message';

require('dotenv').config();
const path = require('path');

const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Use all routes
app.use('/', userRoute);
app.use('/', groupRoute);
app.use('/', messageRoute);

if (process.env.NODE_ENV !== 'production') {
  const config = require('../../webpack.config');
  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: '/dist/'
  }));
  app.use(webpackHotMiddleware(compiler));

  app.use('/dist', express.static(path.join(__dirname, '../client/dist/')));

  app.get('*', (req, res) => res.status(200).sendFile(
    path.resolve(__dirname, '../client/dist/index.html')
  ));
} else {
  app.use('/dist', express.static(path.join(__dirname, '../../client/dist/')));

  app.get('*', (req, res) => res.status(200).sendFile(
    path.resolve(__dirname, '../../client/dist/index.html')
  ));
}
export default app;
