var webpack = require('webpack');
const path = require('path');
const { AngularCompilerPlugin } = require('@ngtools/webpack');

module.exports = exports = Object.create(require('./webpack.base.config.js'));

exports.plugins = [
    // Maps jquery identifiers to the jQuery package (because Bootstrap and other dependencies expects it to be a global variable)
    new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery',
        jquery: 'jquery'
    }),
    new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compressor: { warnings: false },
        // https://github.com/angular/angular/issues/10618
        mangle: {
            keep_fnames: true
        }
    }),
    new webpack.DefinePlugin({
        'process.env': {
          'REDIRECTURI': JSON.stringify('https://play-silhouette-angular-ts.herokuapp.com/oauth2'),
          'GOOGLE_CLIENT_ID': JSON.stringify('445581959814-m8aujn6hs4adfo5ceouot7dl0p7i741c.apps.googleusercontent.com')
        }
      })
];