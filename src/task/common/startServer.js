const bs = require('browser-sync').create();
let startServer = function(startServerObj,cb){
    bs.init({
        server:{
            baseDir: startServerObj.baseDir,
            directory: true
        },
        startPath: startServerObj.startPath,
        port: startServerObj.port,
        reloadDelay: 0,
        timestamps: true
    });
    console.log(startServerObj.logInfo || `服务启动成功`);
    cb ? cb(): undefined;
}

module.exports = {bs,startServer}