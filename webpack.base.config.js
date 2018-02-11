
/**
 * webpack base config
 */

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const packageConfig = require('./package.json');

const SRC_PATH = path.resolve('./src');
const FRONT_END_PATH = path.join(SRC_PATH, 'frontEnd');
const APP_PATH = path.join(FRONT_END_PATH, 'app');
const BUILD_APP_PATH = path.resolve('./build/frontEnd/app');

module.exports = {
    context: APP_PATH,
    resolve: {
        extensions: ['.js', '.jsx']
    },
    entry: {
        app: ['./index.jsx'],
        vendor: ['react', 'react-dom', 'react-router-dom']
    },
    output: {
        path: BUILD_APP_PATH,
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
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
                use: [
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
                use: [
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
        new HtmlWebpackPlugin({
            title: packageConfig.name,
            filename: path.join(BUILD_APP_PATH, './index.html'),
            template: './react/template/index.html',
            hash: false
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks(module) {
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        })
    ]
};

