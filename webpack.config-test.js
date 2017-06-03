// webpack.config.js

var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './index.js',
  output: {
    path: __dirname + "/dist",
    filename: "sketchbook.js"
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.js$/,
      loader: 'eslint-loader',
      exclude: /(node_modules|bower_components)/
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /(node_modules|bower_components)/
    }, {
      test: /sinon.*\.js$/,
      loader: "imports-loader?define=>false,require=>false"
    }, {
      enforce: 'post',
      test: /\.js/,
      exclude: /(node_modules|bower_components)/,
      include: path.resolve('src'),  // instrument only testing sources with Istanbul, after ts-loader runs
      loader: 'istanbul-instrumenter-loader'
    }],
    noParse: [/sinon/],
  },
  resolve: {
    alias: {sinon: 'sinon/pkg/sinon'}
  },
  plugins: []
};
