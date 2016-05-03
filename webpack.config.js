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
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        include: __dirname + '/app/src/',
        query: { //equivalent .babelrc
          presets: [
            'es2015-webpack'
          ],
          plugins: [
            'transform-runtime',
            ['transform-es2015-modules-commonjs-simple', {
              noMangle: true
            }]
          ]
        }
      }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    //new webpack.optimize.UglifyJsPlugin({
    //  compress: {
    //    warnings: false
    //  },
    //  mangle: {
    //    except: ['$super', '$', 'THREE']
    //  },
    //  //sourceMap: false
    //}),
    new webpack.ProvidePlugin({
    })
  ],
  stats: {
    colors: true
  },
  devtool: 'source-map'
};