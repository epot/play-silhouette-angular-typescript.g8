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
            'GOOGLE_CLIENT_ID': JSON.stringify('445581959814-m8aujn6hs4adfo5ceouot7dl0p7i741c.apps.googleusercontent.com'),
            'FACEBOOK_CLIENT_ID': JSON.stringify('157726608232328'),
            'TWITTER_CONSUMER_KEY': JSON.stringify('dFVnpeosDY4zZ0PccZYp5To50'),
        }
      })
];
