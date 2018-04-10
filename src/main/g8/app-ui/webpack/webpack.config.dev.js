/* global __dirname */
const path = require('path');
const webpack = require('webpack');

module.exports = exports = Object.create(require('./webpack.base.config.js'));

exports.devtool = 'source-map';
exports.entry = ['webpack/hot/dev-server', 'webpack-dev-server/client?http://localhost:8080'].concat(exports.entry);
exports.plugins = [
    new webpack.ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)@angular/,
        path.resolve(__dirname, './app')
    ),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
        'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new webpack.DefinePlugin({
        'process.env': {
          'REDIRECTURI': JSON.stringify('http://localhost:9000/oauth2'),
            'GOOGLE_CLIENT_ID': JSON.stringify('445581959814-s926r5damu6oeqcug10lk0vmc7vd0qva.apps.googleusercontent.com'),
            'FACEBOOK_CLIENT_ID': JSON.stringify('157726608232328'),
        }
      })
];