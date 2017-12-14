
/**
 * startServer 操作
 */

const proxyMiddleware = require('http-proxy-middleware');

let startServer = function (config = {}, startCb, endCb) {
    // path 用于判断哪个项目启的服务
    const { srcBase, startPath, port, proxys, bs } = config;
    // const bs = require('browser-sync').create(path);

    startCb && startCb();

    let bsInit = {
        server: {
            baseDir: srcBase,
            directory: true
        },
        startPath: startPath,
        port: port,
        reloadDelay: 0,
        timestamps: true
    }

    // 代理 规则-代理地址(target默认为空不起代理)
    if (proxys.length > 0) {
        let middleware = [];
        for (var i = 0; i < proxys.length; i++) {
            middleware.push(proxyMiddleware(proxys[i].rule, { target: proxys[i].target, changeOrigin: true }))
        }
        bsInit.server.middleware = middleware;
    }

    bs.init(bsInit);

    endCb && endCb();
}

module.exports = { startServer }