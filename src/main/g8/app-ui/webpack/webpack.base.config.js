/* global __dirname */
var webpack = require('webpack');
var path = require('path');
console.log(__dirname);
var buildPath = path.resolve(__dirname, '../../public/bundles/');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');

/**
 * Base configuration object for Webpack
 */
var config = {
    entry: [
        './app/main.ts'
    ],
    output: {
        path: buildPath,
        filename: 'bundle.js',
        sourceMapFilename: 'bundle.map',
        publicPath: '/bundles/'
    },
    externals: {
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader','css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'url-loader?limit=10000',  
            },
            {
                test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                use: 'file-loader',
              },
              {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                  'file-loader?name=images/[name].[ext]',
                  'image-webpack-loader?bypassOnDebug'
                ]  
            },
            {
                test: /\.es6$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                  presets: ['es2015']
                }
            },
            {
                test: /\.xlf/,
                loader: 'raw-loader'
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'raw-loader'
            },
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                    {
                        loader: 'ts-loader'
                    }
                ]
            },
            // font-awesome
            {
                test: /font-awesome\.config\.js/,
                use: [
                { loader: 'style-loader' },
                { loader: 'font-awesome-loader' }
                ]
            },
        ]
    },
    resolve: {
        extensions: ['.ts','.tsx','.js','.json','.css','.html']
    },
    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            path.resolve(__dirname, './app')
        ),
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' })
    ]
};

module.exports = config;

