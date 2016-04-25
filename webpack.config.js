var path = require('path');
var webpack = require('webpack');
var OfflinePlugin = require('offline-plugin');

module.exports = {
    entry: './js/index.js',
    output: {
        path: __dirname,
        filename: './build/creator.js'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: path.join(__dirname, 'js'),
                query: {
                    presets: 'es2015'
                }
            }
        ]
    },
    plugins: [
        // Avoid publishing files when compilation fails
        new webpack.NoErrorsPlugin(),
        //new webpack.optimize.UglifyJsPlugin(),
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
        //})
    ],
    stats: {
        // Nice colored output
        colors: true
    },
    // Create Sourcemaps for the bundle
    devtool: 'source-map',
};
