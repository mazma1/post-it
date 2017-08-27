import express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../../webpack.config';
import userRoute from './routes/user';
import groupRoute from './routes/group';

require('dotenv').config();
const path = require('path');

const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Use all routes
app.use('/', userRoute);
app.use('/', groupRoute);

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: '/dist/'
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.use('/dist', express.static(path.join(__dirname, '../client/dist/')));

app.get('*', (req, res) => res.status(200).sendFile(
  path.resolve(__dirname, '../client/dist/index.html')
));

export default app;
