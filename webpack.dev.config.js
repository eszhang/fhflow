/**
 * webpack dev config
 */

const webpack = require('webpack');
const OpenBrowser = require('open-browser-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const config = require('./config');
const webpackConfig = require('./webpack.base.config');

const { hotReloadHost, hotReloadPort } = config;

// 添加 scss less css处理
webpackConfig.module.rules.push({
    test: /\.css$/,
    use: [
        'style-loader',
        {
            loader: 'css-loader'
            // options: { sourceMap: true }
        }
    ]
}, {
    test: /\.scss$/,
    use: [
        'style-loader',
        {
            loader: 'css-loader'
            // options: { sourceMap: true }
        },
        'sass-loader'
    ],
    exclude: /node_modules/
}, {
    test: /\.less$/,
    use: [
        'style-loader',
        {
            loader: 'css-loader'
            // options: { sourceMap: true }
        },
        'less-loader'
    ],
    exclude: /node_modules/
});

// 定义 运行环境变量
webpackConfig.plugins.unshift(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development')
}));

// 添加 进度查看
webpackConfig.plugins.push(new ProgressBarPlugin());

// 添加 Sourcemap 支持
webpackConfig.plugins.push(new webpack.SourceMapDevToolPlugin({
    filename: '[file].map',
    exclude: ['vendor.js'] // vendor 通常不需要 sourcemap
}));

// 添加 自动打开浏览器
webpackConfig.plugins.push(new OpenBrowser({
    url: `http://${hotReloadHost}:${hotReloadPort}`
}));

// Hot module replacement
Object.keys(webpackConfig.entry).forEach((key) => {
    // 这里有一个私有的约定，如果 entry 是一个数组，则证明它需要被 hot module replace
    if (Array.isArray(webpackConfig.entry[key])) {
        webpackConfig.entry[key].unshift(
            'babel-polyfill',
            'react-hot-loader/patch',
            `webpack-hot-middleware/client?path=http://${hotReloadHost}:${hotReloadPort}/__webpack_hmr`
        );
    }
});
webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

module.exports = webpackConfig;
