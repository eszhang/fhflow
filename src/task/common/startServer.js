/**
 * startServer 操作
 */

const bs = require('browser-sync').create();

let startServer = function(config,cb){

    const { srcBase, startPath, port } = config;

    bs.init({
        server:{
            baseDir: srcBase,
            directory: true
        },
        startPath: startPath,
        port: port,
        reloadDelay: 0,
        timestamps: true
    });
    cb && cb();
}

module.exports = {bs,startServer}