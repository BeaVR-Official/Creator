const path          = require('path');
const webpack       = require('webpack');
const OfflinePlugin = require('offline-plugin');

module.exports = {
  entry: {
    creator: './app/src/creator.js',
    tests: './app/tests/tests.js'
  },
  output: {
    path: __dirname,
    filename: '[name].js'
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
    // Avoid publishing files when compilation fails
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin()
    //new OfflinePlugin({
    //    // All options are optional
    //    caches: 'all',
    //    scope: '/',
    //    updateStrategy: 'all',
    //    version: 'v1',
    //
    //    ServiceWorker: {
    //        output: 'sw.js'
    //    },
    //
    //    AppCache: {
    //        directory: 'appcache/'
    //    }
    //}),
  ],
  stats: {
    // Nice colored output
    colors: true
  },
  // Create Sourcemaps for the bundle
  devtool: 'source-map'
};