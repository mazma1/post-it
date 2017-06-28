const path = require('path');
const webpack = require('webpack');
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
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/, loader: 'url-loader?importLoaders=1&limit=100000' },
      { test: /bootstrap\/dist\/js\/umd\//, loader: 'imports?jQuery=jquery' },
      // { test: /\.(css)$/, use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }), exclude: /node_modules/ },
      { test: /\.(scss)$/, use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' }), exclude: /node_modules/ }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './app/client/index.html'
    }),
    new ExtractTextPlugin({
      filename: 'css/style.css',
      allChunks: true
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
};
