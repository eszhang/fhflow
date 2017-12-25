

/**
 * task 任务队列
 */

const path = require('path');
const async = require('async');
const htmlHandler = require('./atom/html');
const sassHandler = require('./atom/sass');
const cleanHandler = require('./atom/clean');
const javascriptHandler = require('./atom/javascript');
const tplHandler = require('./atom/tpl');
const imageHandler = require('./atom/image');
const fontHandler = require('./atom/font');
const copyHandler = require('./atom/copy');
const iconfontHandler = require('./atom/iconfont');
const startServerHandler = require('./atom/server').startServer;
const watchHandler = require('./atom/watch');
const zipHandler = require('./atom/zip');
const sshHandler = require('./atom/ssh');
const remHandler = require('./atom/rem');
const reversionHandler = require('./atom/reversion');
const { requireUncached, isFileExist, isDirExist } = require('./util/index');

let { getDevObj, getPackObj, getUploadObj } = require('./task.config.js');

let { constantConfig, cacheConfig } = require('./common/index'),
    { NAME, ROOT, WORKSPACE, CONFIGNAME, CONFIGPATH, PLATFORM, DEFAULT_PAT, TEMPLAGE_PROJECT, TEMPLAGE_EXAMPLE, EXAMPLE_NAME } = constantConfig;

//dev task
function dev(projectPath, loggerhandler, notifier, fn) {

    let curConfigPath = path.join(projectPath, CONFIGNAME),
        setting = requireUncached(curConfigPath);

    let devConfig = getDevObj({
        path: projectPath,
        packageModules: setting.modules,
        setting: setting
    });

     const bs = require('browser-sync').create(projectPath);

    let { clean, sass, font, html, img, js, tpl, iconfont, startServer, watch, others, oasisl } = devConfig;

    // 加入控制修改后刷新
    watch.liverload = setting.server.liverload;
    watch.startServerPath = startServer.path;


    let prefixLog = "[dev-task] ";

    loggerhandler({
        desc: prefixLog + "dev模式已打开...",
        type: "warning"
    });

    async.series([
        function (next) {
            cleanHandler(clean, function () {
                loggerhandler({
                    desc: prefixLog + clean.startLog,
                    type: "info"
                });
            }, function () {
                loggerhandler({
                    desc: prefixLog + clean.endLog,
                    type: "success"
                });
                next();
            });
        },
        function (next) {
            fontHandler(font, function () {
                loggerhandler({
                    desc: prefixLog + font.startLog,
                    type: "info"
                });
            }, function () {
                loggerhandler({
                    desc: prefixLog + font.endLog,
                    type: "success"
                });
                next();
            });
        },
        function (next) {
            htmlHandler(html, function () {
                loggerhandler({
                    desc: prefixLog + html.startLog,
                    type: "info"
                });
            }, function () {
                loggerhandler({
                    desc: prefixLog + html.endLog,
                    type: "success"
                });
                next();
            });
        },
        function (next) {
            imageHandler(img, function () {
                loggerhandler({
                    desc: prefixLog + img.startLog,
                    type: "info"
                });
            }, function () {
                loggerhandler({
                    desc: prefixLog + img.endLog,
                    type: "success"
                });
                next();
            });
        },
        function (next) {
            sassHandler(sass, function () {
                loggerhandler({
                    desc: prefixLog + sass.startLog,
                    type: "info"
                });
            }, function () {
                loggerhandler({
                    desc: prefixLog + sass.endLog,
                    type: "success"
                });
                next();
            });
        },
        function (next) {
            if(devConfig.compileAutoprefixer !== undefined){
                remHandler(devConfig.compileAutoprefixer, function () {
                    loggerhandler({
                        desc: prefixLog + devConfig.compileAutoprefixer.startLog,
                        type: "info"
                    });
                }, function () {
                    loggerhandler({
                        desc: prefixLog + devConfig.compileAutoprefixer.endLog,
                        type: "success"
                    });
                    next();
                });
            }else{
                next();
            }
        },
        function (next) {
            tplHandler(tpl, function () {
                loggerhandler({
                    desc: prefixLog + tpl.startLog,
                    type: "info"
                });
            }, function () {
                loggerhandler({
                    desc: prefixLog + tpl.endLog,
                    type: "success"
                });
                next();
            });
        },
        function (next) {
            javascriptHandler(js, function () {
                loggerhandler({
                    desc: prefixLog + js.startLog,
                    type: "info"
                });
            }, function () {
                loggerhandler({
                    desc: prefixLog + js.endLog,
                    type: "success"
                });
                next();
            });
        },
        function (next) {
            iconfontHandler(iconfont, function () {
                loggerhandler({
                    desc: prefixLog + iconfont.startLog,
                    type: "info"
                });
            }, function () {
                loggerhandler({
                    desc: prefixLog + iconfont.endLog,
                    type: "success"
                });
                next();
            });
        },
        function (next) {
            copyHandler(others, function () {
                loggerhandler({
                    desc: prefixLog + others.startLog,
                    type: "info"
                });
            }, function () {
                loggerhandler({
                    desc: prefixLog + others.endLog,
                    type: "success"
                });
                next();
            });
        },
        function (next) {
            copyHandler(oasisl, function () {
                // 不是所有项目都有oasisl所以不打印日志了
            }, function () {
                next();
            });
        },
        function (next) {
            if(devConfig.reversion !== undefined){
                reversionHandler(devConfig.reversion, function () {
                    loggerhandler({
                        desc: prefixLog + devConfig.reversion.startLog,
                        type: "info"
                    });
                }, function () {
                    loggerhandler({
                        desc: prefixLog + devConfig.reversion.endLog,
                        type: "success"
                    });
                    next();
                });
            }else{
                next();
            }
        },
        function (next) {
            devConfig.bs = bs;
            watchHandler(devConfig, loggerhandler, function () {

            }, function () {
                loggerhandler({
                    desc: prefixLog + watch.endLog,
                    type: "success"
                });
                next();
            });
        },
        function (next) {
            startServer.bs = bs;
            startServerHandler(startServer, function () {

            }, function () {
                loggerhandler({
                    desc: prefixLog + startServer.endLog,
                    type: "success"
                });
                fn && fn();
                next();
            });
        }
    ])
}

//upload task
function upload(projectPath, loggerhandler, notifier, fn) {
    let curConfigPath = path.join(projectPath, CONFIGNAME),
        setting = requireUncached(curConfigPath),
        sshObj = getUploadObj({
            path: projectPath,
            packageModules: setting.modules,
            setting: setting
        });

    let prefixLog = "[upload-task] ";

    loggerhandler({
        desc: prefixLog + "upload模式已打开...",
        type: "warning"
    });

    sshHandler(sshObj, function () {
        loggerhandler({
            desc: prefixLog + sshObj.startLog,
            type: "info"
        });
    }, function () {
        loggerhandler({
            desc: prefixLog + sshObj.endLog,
            type: "success"
        });
        fn && fn();
    });
}

//pack task
function pack(projectPath, loggerhandler, notifier, fn) {

    let curConfigPath = path.join(projectPath, CONFIGNAME),
        setting = requireUncached(curConfigPath);

    let packConfig = getPackObj({
        path: projectPath,
        packageModules: setting.modules,
        setting: setting
    });

    let { clean, sass, font, html, img, js, iconfont, tpl, zip } = packConfig;

    let prefixLog = "[pack-task] ";

    loggerhandler({
        desc: prefixLog + "pack模式已打开...",
        type: "warning"
    });

    async.series([
        function (next) {
            cleanHandler(clean, function () {
                loggerhandler({
                    desc: prefixLog + clean.startLog,
                    type: "info"
                });
            }, function () {
                loggerhandler({
                    desc: prefixLog + clean.endLog,
                    type: "success"
                });
                next();
            });
        },
        function (next) {
            fontHandler(font, function () {
                loggerhandler({
                    desc: prefixLog + font.startLog,
                    type: "info"
                });
            }, function () {
                loggerhandler({
                    desc: prefixLog + font.endLog,
                    type: "success"
                });
                next();
            });
        },
        function (next) {
            htmlHandler(html, function () {
                loggerhandler({
                    desc: prefixLog + html.startLog,
                    type: "info"
                });
            }, function () {
                loggerhandler({
                    desc: prefixLog + html.endLog,
                    type: "success"
                });
                next();
            });
        },
        function (next) {
            imageHandler(img, function () {
                loggerhandler({
                    desc: prefixLog + img.startLog,
                    type: "info"
                });
            }, function () {
                loggerhandler({
                    desc: prefixLog + img.endLog,
                    type: "success"
                });
                next();
            });
        },
        function (next) {
            sassHandler(sass, function () {
                loggerhandler({
                    desc: prefixLog + sass.startLog,
                    type: "info"
                });
            }, function () {
                loggerhandler({
                    desc: prefixLog + sass.endLog,
                    type: "success"
                });
                next();
            });
        },
        function (next) {
            if(packConfig.compileAutoprefixer !== undefined){
                remHandler(packConfig.compileAutoprefixer, function () {
                    loggerhandler({
                        desc: prefixLog + packConfig.compileAutoprefixer.startLog,
                        type: "info"
                    });
                }, function () {
                    loggerhandler({
                        desc: prefixLog + packConfig.compileAutoprefixer.endLog,
                        type: "success"
                    });
                    next();
                });
            }else{
                next();
            }
        },
        function (next) {
            tplHandler(tpl, function () {
                loggerhandler({
                    desc: prefixLog + tpl.startLog,
                    type: "info"
                });
            }, function () {
                loggerhandler({
                    desc: prefixLog + tpl.endLog,
                    type: "success"
                });
                next();
            });
        },
        function (next) {
            javascriptHandler(js, function () {
                loggerhandler({
                    desc: prefixLog + js.startLog,
                    type: "info"
                });
            }, function () {
                loggerhandler({
                    desc: prefixLog + js.endLog,
                    type: "success"
                });
                next();
            });
        },
        function (next) {
            iconfontHandler(iconfont, function () {
                loggerhandler({
                    desc: prefixLog + iconfont.startLog,
                    type: "info"
                });
            }, function () {
                loggerhandler({
                    desc: prefixLog + iconfont.endLog,
                    type: "success"
                });
                next();
            });
        },
        function (next) {
            if(packConfig.reversion !== undefined){
                reversionHandler(packConfig.reversion, function () {
                    loggerhandler({
                        desc: prefixLog + packConfig.reversion.startLog,
                        type: "info"
                    });
                }, function () {
                    loggerhandler({
                        desc: prefixLog + packConfig.reversion.endLog,
                        type: "success"
                    });
                    next();
                });
            }else{
                next();
            }
        },
        function (next) {
            zipHandler(zip, function () {

            }, function () {
                loggerhandler({
                    desc: prefixLog + zip.endLog,
                    type: "success"
                });
                console.log("已经为完成")
                fn && fn();
                next();
            });
        }
    ])
}

module.exports = { dev, upload, pack };

