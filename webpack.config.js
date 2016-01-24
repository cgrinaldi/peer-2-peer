var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'client', 'build');
// var mainPath = path.resolve(__dirname, 'app', 'index.jsx');
var mainPath = path.resolve(__dirname, 'client', 'js', 'index.jsx');

module.exports = {
  devtool: 'eval',

  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    mainPath
  ],

  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: '/build/'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: [nodeModulesPath]
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      }
    ]
  },

  plugins: [new Webpack.HotModuleReplacementPlugin()]
};
