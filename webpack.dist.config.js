
/*
 * webpack dist config
 */

const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('./webpack.base.config');

const SRC_PATH = path.resolve('./src');
const APP_PATH = path.join(SRC_PATH, 'app');
const ELECTRON_PATH = path.join(SRC_PATH, 'electron');
const TASK_PATH = path.join(SRC_PATH, 'task');
const CONNECT_PATH = path.join(SRC_PATH, 'connect');
const ASSETS_BUILD_PATH = path.resolve('./build');
const ASSETS_BUILD_APP_PATH = path.resolve('./build/app');
const ASSETS_BUILD_ELECTRON_PATH = path.resolve('./build/electron');
const ASSETS_BUILD_TASK_PATH = path.resolve('./build/task');
const ASSETS_BUILD_CONNECT_PATH = path.resolve('./build/connect');

config.module.rules.push(
    {
        test: /\.css$/,
        use: [
            'style-loader',
            'css-loader'
        ]
    },
    {
        test: /\.scss$/,
        use: [
            'style-loader',
            'css-loader',
            'sass-loader'
        ],
        exclude: /node_modules/
    }
);

config.plugins.unshift(
    new CleanWebpackPlugin([ASSETS_BUILD_PATH], { verbose: false })
);

config.plugins.push(
    new CopyWebpackPlugin(
        [{
            from: ELECTRON_PATH,
            to: ASSETS_BUILD_ELECTRON_PATH
        }, {
            from: TASK_PATH,
            to: ASSETS_BUILD_TASK_PATH
        }, {
            from: CONNECT_PATH,
            to: ASSETS_BUILD_CONNECT_PATH
        }]
    )
);

module.exports = config;