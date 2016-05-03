const path          = require('path');
const webpack       = require('webpack');
const OfflinePlugin = require('offline-plugin');

module.exports = {
  entry: {
    creator: __dirname + '/app/src/creator.js',
    tests: __dirname + '/app/tests/tests.js'
  },
  output: {
    path: __dirname + '/app/dist/',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js',
    filename: '[name].js',
    pathinfo: true
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: 'es2015'
        }
      }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: {
        except: ['$super', '$', 'THREE']
      },
    }),
    new webpack.ProvidePlugin({
      "THREE": "three"
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  stats: {
    colors: true
  },
  devtool: 'source-map',
  quiet: false,
  noInfo: false,
  lazy: true
};