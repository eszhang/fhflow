/**
 * server
 */
const express = require('express');
const path = require('path');
const chaf = require('connect-history-api-fallback');
const config = require('./config');

const { hotReloadHost, hotReloadPort } = config;

const app = express();

app.use('/', chaf());
app.use('/', express.static(path.resolve(__dirname, '..', 'build')));
app.get('/api/getLocation', (req, res) => {
    res.status(200).send({ cityName: '北京' });
});

if (process.env.NODE_ENV !== 'production') {
    const webpack = require('webpack');
    const webpackConfig = require('./webpack.dev.config');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');

    const webpackCompiled = webpack(webpackConfig);

    // 配置运行时打包
    app.use(webpackDevMiddleware(webpackCompiled, {
        publicPath: '/',
        stats: { colors: true },
        lazy: false,
        watchOptions: {
            aggregateTimeout: 300,
            poll: true
        }
    }));

    // 配置热更新
    app.use(webpackHotMiddleware(webpackCompiled));
}

const server = app.listen(hotReloadPort, () => {
    const port = server.address().port;
    console.log(`Open http://${hotReloadHost}:%s`, port);
});
