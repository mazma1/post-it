const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    '../post-it/app/client/index.js'
  ],
  output: {
    path: path.resolve(__dirname, './app/client/dist'),
    filename: 'index_bundle.js'
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
      // { test: /\.(css)$/, use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }), exclude: /node_modules/ },
      { test: /\.(scss)$/, use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' }), exclude: /node_modules/ }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './app/client/index.html'
    }),
    new ExtractTextPlugin({
      filename: 'css/main.css',
      allChunks: true
    })
  ]
};
