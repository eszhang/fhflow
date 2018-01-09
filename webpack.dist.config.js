
/**
 * webpack dist config
 */

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const config = require('./webpack.base.config');

config.module.rules.push(
    {
        test: /\.css$/,
        use: ExtractTextPlugin.extract(
            [
                {
                    loader: 'css-loader',
                    options: { minimize: true }
                }
            ]
        ),
        exclude: /node_modules/y
    },
    {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract(
            [
                {
                    loader: 'css-loader',
                    options: { minimize: true }
                },
                'sass-loader'
            ]
        ),
        exclude: /node_modules/
    },
    {
        test: /\.less$/,
        use: ExtractTextPlugin.extract(
            [
                {
                    loader: 'css-loader',
                    options: { minimize: true }
                },
                'less-loader'
            ]
        ),
        exclude: /node_modules/
    }
);

config.plugins.unshift(
    new webpack.DefinePlugin(
        {
            'process.env.NODE_ENV': JSON.stringify('production')
        }
    ),
    new ExtractTextPlugin('[name].css'),
    new UglifyJsPlugin(
        {
            uglifyOptions: {
                output: {
                    comments: false,
                    beautify: false
                }
            }
        }
    )
);

module.exports = config;