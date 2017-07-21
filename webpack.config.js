const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const DIST_DIR = path.resolve(__dirname, './app/client/dist');

module.exports = {
  entry: [
    'webpack/hot/dev-server', // HMR works without this
    'webpack-hot-middleware/client?noInfo=true',
    '../post-it/app/client/index.js'
  ],
  output: {
    path: '/',
    filename: 'index_bundle.js',
    publicPath: '/dist/'
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, loaders: ['react-hot-loader', 'babel-loader'], exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style-loader!css-loader?url=false' },
      { test: /\.scss$/, loader: 'style-loader!css-loader?url=false!sass-loader' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=/fonts' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
      { test: /bootstrap\/dist\/js\/umd\//, loader: 'imports?jQuery=jquery' },
      { test: /\.(jpe?g|png|gif)$/i, loader: 'file-loader?name=/img/[name].[ext]' },
      // { test: /\.css$/, use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader'] }), exclude: /node_modules/ },
      // { test: /\.(scss)$/, use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' }), exclude: /node_modules/ }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './app/client/index.html'
    }),
    // new ExtractTextPlugin({
    //   filename: 'css/style.css',
    //   allChunks: true
    // }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  node: {
    net: 'empty',
    dns: 'empty'
  }
};
