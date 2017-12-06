
/**
 * startServer 操作
 */

const bs = require('browser-sync').create();
const proxyMiddleware = require('http-proxy-middleware');

let startServer = function (config = {}, cb) {

    const { srcBase, startPath, port, proxys } = config;


    var bsInit = {
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
    if( proxys.length > 0 ){
        var middleware = [];
        for( var i = 0; i < proxys.length; i++ ){
            middleware.push(proxyMiddleware(proxys[i].rule, {target: proxys[i].target, changeOrigin: true}))
        }
        bsInit.server.middleware = middleware;
    }

    bs.init(bsInit);

    cb && cb();
}

module.exports = { bs, startServer }