
/*
 * webpack base config
 * 模块化打包后面再考虑
 */

const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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


module.exports = {
    context: APP_PATH, // 设置源代码的默认根路径
    resolve: {
        extensions: ['.js', '.jsx']
    },
    entry: {
        app: ['./app.jsx']
    },
    output: {
        path: ASSETS_BUILD_APP_PATH,
        filename: '[name].js'
    },
    module: {
        rules: [
            // {
            //     enforce: 'pre',  // ESLint 优先级高于其他 JS 相关的 loader
            //     test: /\.jsx?$/,
            //     exclude: /node_modules/,
            //     loader: 'eslint-loader'
            // },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                use:
                [
                    {
                        loader: 'url-loader',
                        options:
                        {
                            limit: 8192,
                            name: 'images/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use:
                [
                    {
                        loader: 'url-loader',
                        options:
                        {
                            limit: 8192,
                            mimetype: 'application/font-woff',
                            name: 'fonts/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options:
                        {
                            limit: 8192,
                            mimetype: 'application/font-woff',
                            name: 'fonts/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // new CleanWebpackPlugin([ASSETS_BUILD_PATH], { verbose: false }),
        new HtmlWebpackPlugin({
            filename: path.join(ASSETS_BUILD_APP_PATH, './index.html'),
            template: './react/template/index.html',
            hash: false
        }),
        // new CopyWebpackPlugin([{
        //     from: ELECTRON_PATH,
        //     to: ASSETS_BUILD_ELECTRON_PATH
        // }, {
        //     from: TASK_PATH,
        //     to: ASSETS_BUILD_TASK_PATH
        // },{
        //     from: CONNECT_PATH,
        //     to: ASSETS_BUILD_CONNECT_PATH
        // }])
    ]
}