// webpack.config.js

var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './index.js',
  output: {
    path: __dirname + "/dist",
    filename: "sketchbook.js",
    libraryTarget: "umd", // export itself to a global var
    library: "sketchbook" // name of the global var: "sketchbook"
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
    }]
  },
  plugins: []
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
