
/**
 * webpack dev config
 */

const webpack = require('webpack');
const path = require('path');
const config = require('./webpack.base.config');

// 添加 webpack-dev-server 相关的配置项
config.devServer = {
    contentBase: path.join(__dirname, 'build'),
    inline: true,
    hot: true
};

config.module.rules.push(
    {
        test: /\.css$/,
        use: [
            'style-loader',
            {
                loader: 'css-loader',
                options: { sourceMap: true }
            }
        ]
    },
    {
        test: /\.scss$/,
        use: [
            'style-loader',
            {
                loader: 'css-loader',
                options: { sourceMap: true }
            },
            'sass-loader'
        ],
        exclude: /node_modules/
    }
);

// 定义 运行环境变量
config.plugins.unshift(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development')
}));

// 添加 Sourcemap 支持
config.plugins.push(new webpack.SourceMapDevToolPlugin({
    filename: '[file].map',
    exclude: ['vendor.js'] // vendor 通常不需要 sourcemap
}));

// Hot module replacement
Object.keys(config.entry).forEach((key) => {
    // 这里有一个私有的约定，如果 entry 是一个数组，则证明它需要被 hot module replace
    if (Array.isArray(config.entry[key])) {
        config.entry[key].unshift(
            'webpack-dev-server/client?http://0.0.0.0:8080',
            'webpack/hot/only-dev-server'
        );
    }
});
config.plugins.push(new webpack.HotModuleReplacementPlugin());

module.exports = config;
