

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
const startServerHandler = require('./atom/startServer').startServer;
const watchHandler = require('./atom/watch');
const zipHandler = require('./atom/zip');
const sshHandler = require('./atom/ssh');
const { requireUncached, isFileExist, isDirExist } = require('./util/index');

let { getDevObj, getPackObj, getUploadObj } = require('./task.config.js');

let { constantConfig, cacheConfig } = require('./common/index'),
    { NAME, ROOT, WORKSPACE, CONFIGNAME, CONFIGPATH, PLATFORM, DEFAULT_PAT, TEMPLAGE_PROJECT, TEMPLAGE_EXAMPLE, EXAMPLE_NAME } = constantConfig;

//dev task
function dev(projectPath, loggerhandler) {

    let curConfigPath = path.join(projectPath, CONFIGNAME),
        setting = requireUncached(curConfigPath);

    let devConfig = getDevObj({
        path: projectPath,
        packageModules: setting.modules,
        setting: setting
    });

    let { clean, sass, font, html, img, js, tpl, startServer, watch } = devConfig;

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
            startServerHandler(startServer, function () {

            }, function () {
                loggerhandler({
                    desc: prefixLog + startServer.endLog,
                    type: "success"
                });
                next();
            });
        }
    ])
}

//upload task
function upload(projectPath, loggerhandler) {
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
            desc: prefixLog + sshObj.starttLog,
            type: "info"
        });
    }, function () {
        loggerhandler({
            desc: prefixLog + sshObj.endtLog,
            type: "success"
        });
    });
}

//pack task
function pack(projectPath, loggerhandler) {

    let curConfigPath = path.join(projectPath, CONFIGNAME),
        setting = requireUncached(curConfigPath);

    let packConfig = getPackObj({
        path: projectPath,
        packageModules: setting.modules,
        setting: setting
    });

    let { clean, sass, font, html, img, js, tpl, zip } = packConfig;

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
            zipHandler(zip, function () {

            }, function () {
                loggerhandler({
                    desc: prefixLog + zip.endLog,
                    type: "success"
                });
               console.log("已经为完成")
                next();
            });
        }
    ])
}

module.exports = { dev, upload, pack };

