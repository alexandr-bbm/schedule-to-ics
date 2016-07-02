'use strict';
var ISDEV = process.env.NODE_ENV === 'development';
var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

require('es6-promise').polyfill();

module.exports = {
    entry: './src/main.es6',

    output: {
        publicPath: '/build/',
        path: path.join(__dirname, './build/'),
        filename: '[name].min.js'
    },

    plugins: [
        new ExtractTextPlugin('[name].css'),
        new webpack.ProvidePlugin({
            $: 'jquery',
            ics: 'ics',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
    ],

    module: {
        loaders: [
            {
                test: /\.es6$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    'style-loader',
                    'css-loader!postcss!sass-loader?outputStyle=expanded'
                )
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(
                    'style-loader',
                    'css-loader!postcss!'
                )
            }
        ]
    },

    postcss: [
        autoprefixer({
            browsers: ['last 2 versions']
        })
    ],

    stats: {
        // Colored output
        colors: true
    },
    resolve: {
        alias: {
            jquery: path.join(__dirname, 'node_modules/jquery/dist/jquery.js'),
            ics: path.join(__dirname, 'src/non_npm_libs/ics.deps.min.js'),
            $: 'jquery'
        },
        modulesDirectories: ['./src', './node_modules'],
        extensions: ['', '.js', '.es6']
    },

    // Create Sourcemaps for the bundle
    devtool: 'inline-source-map',
    watch: ISDEV,
};