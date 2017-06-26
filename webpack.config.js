const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: '../post-it/app/client/index.js',
  output: {
    path: path.resolve(__dirname, './app/client/dist'),
    filename: 'index_bundle.js'
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.(css)$/, use: ['style-loader', 'css-loader'], exclude: /node_modules/ }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    template: './app/client/index.html'
  })]
};
