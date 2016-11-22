const webpack       = require('webpack');
const path          = require('path');

module.exports = {
  entry:
    {
    creator: __dirname + '/app/src/creator.js',
    runner:  __dirname + '/app/src/runner.js',
    tests:   __dirname + '/app/tests/tests.js'
  },
  output:  {
    path:              __dirname + '/app/dist/',
    sourceMapFilename: '[name].map',
    chunkFilename:     '[id].chunk.js',
    filename:          '[name].js'
  },
  module:  {
    loaders: [
      {
        loader: "babel-loader",

        // Skip any files outside of your project's `src` directory
        include: [
          __dirname, "/app/src"
        ],

        exclude: [
          __dirname + "/node_modules",
        ],
        // Only run `.js` and `.jsx` files through Babel
        test: /\.jsx?$/,

        // Options to configure babel with
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015'],
        }
      },
      {
        test: /\.scss$/,
        include: [__dirname, "/app/assets/styles"],
        loaders: ["style", "css", "sass"]
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
      //Physijs: Physijs
    })
  ],
  stats:   {
    colors: true
  },
  devtool: 'source-map'
};
