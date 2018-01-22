
/**
 * server 操作
 */

const proxyMiddleware = require('http-proxy-middleware');


const startServer = function (config = {}, cbs = {}) {
    // path 用于判断哪个项目启的服务
    const {
        srcBase, startPath, port, proxys, bs
    } = config;
    const {
        start = function () { },
        end = function () { }
    } = cbs;

    start();

    const bsInit = {
        server: {
            baseDir: srcBase,
            directory: true
        },
        startPath,
        port,
        reloadDelay: 0,
        timestamps: true
    };

    // 代理 规则-代理地址(target默认为空不起代理)
    if (proxys.length > 0) {
        const middleware = [];
        for (let i = 0; i < proxys.length; i++) {
            middleware.push(proxyMiddleware(proxys[i].rule, { target: proxys[i].target, changeOrigin: true }));
        }
        bsInit.server.middleware = middleware;
    }

    bs.init(bsInit);

    end();
};


module.exports = { startServer };
