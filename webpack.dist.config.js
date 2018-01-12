
/**
 * webpack dist config
 */

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const config = require('./webpack.base.config');

// 添加 eslint检查
config.module.rules.unshift({
    enforce: 'pre',
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'eslint-loader',
    options: {
        fix: true
    }
});

// 添加scss less css处理
config.module.rules.push({
    test: /\.css$/,
    use: ExtractTextPlugin.extract([
        {
            loader: 'css-loader',
            options: { minimize: true }
        }
    ]),
    exclude: /node_modules/y
}, {
    test: /\.scss$/,
    use: ExtractTextPlugin.extract([
        {
            loader: 'css-loader',
            options: { minimize: true }
        },
        'sass-loader'
    ]),
    exclude: /node_modules/
}, {
    test: /\.less$/,
    use: ExtractTextPlugin.extract([
        {
            loader: 'css-loader',
            options: { minimize: true }
        },
        'less-loader'
    ])
});

// 添加 环境变量 css模块化语法检查 js压缩
config.plugins.unshift(
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new ExtractTextPlugin('[name].css'),
    new StyleLintPlugin({
        configFile: './.stylelintrc'
    }),
    new UglifyJsPlugin({
        uglifyOptions: {
            output: {
                comments: false,
                beautify: false
            }
        }
    })
);

module.exports = config;
