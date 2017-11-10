
/*
 * webpack dev config
 */

const webpack = require('webpack'),
    config = require('./webpack.base.config');

// 添加 webpack-dev-server 相关的配置项
config.devServer = {
    contentBase: './build',
    // hot: true
};
// 有关 Webpack 的 API 本地代理，另请参考 https://webpack.github.io/docs/webpack-dev-server.html#proxy 

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

module.exports = config;