const path          = require('path');
const webpack       = require('webpack');
const OfflinePlugin = require('offline-plugin');

module.exports = {
  entry: {
    creator: __dirname + '/app/src/index.js',
    tests: __dirname + '/app/tests/index.js'
  },
  output: {
    path: __dirname + "/app/dist/",
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
    // Avoid publishing files when compilation fails
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: {
        except: ['$super', '$', 'THREE']
      }
    }),
    new webpack.ProvidePlugin({
      "THREE": "three"
    }),
    // new OfflinePlugin({
    //   // All options are optional
    //   caches: 'all',
    //   scope: '/',
    //   updateStrategy: 'all',
    //   version: 'v1',
    //
    //   ServiceWorker: {
    //     output: 'sw.js'
    //   },
    //
    //   AppCache: {
    //     directory: 'appcache/'
    //   }
    // })
  ],
  stats: {
    // Nice colored output
    colors: true
  },
  // Create Sourcemaps for the bundle
  devtool: 'source-map'
};