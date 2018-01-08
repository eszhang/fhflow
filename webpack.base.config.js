
/**
 * webpack base config
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const SRC_PATH = path.resolve('./src');
const APP_PATH = path.join(SRC_PATH, 'app');
const BUILD_APP_PATH = path.resolve('./build/app');

module.exports = {
    context: APP_PATH, // 设置源代码的默认根路径
    resolve: {
        extensions: ['.js', '.jsx']
    },
    entry: {
        app: ['./app.jsx']
    },
    output: {
        path: BUILD_APP_PATH,
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    fix: true
                }
            },
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
            filename: path.join(BUILD_APP_PATH, './index.html'),
            template: './react/template/index.html',
            hash: false
        })
    ]
};

