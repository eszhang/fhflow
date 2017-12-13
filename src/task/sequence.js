

/**
 * task 任务队列
 */

const path = require('path');
const { requireUncached, isFileExist, isDirExist } = require('./util/index');
const Html = require('./atom/html');
const Sass = require('./atom/sass');
const Clean = require('./atom/clean');
const JavaSript = require('./atom/javascript');
const Tpl = require('./atom/tpl');
const Image = require('./atom/image');
const Font = require('./atom/font');
const StartServer = require('./atom/startServer').startServer;
const Watch = require('./atom/watch');
const Zip = require('./atom/zip');
const Ssh = require('./atom/ssh');
const async = require('async');

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
            Clean(clean, function () {
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
            Font(font, function () {
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
            Html(html, function () {
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
            Image(img, function () {
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
            Sass(sass, function () {
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
            Tpl(tpl, function () {
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
            JavaSript(js, function () {
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
            Watch(watch, devConfig, function () {

            }, function () {
                loggerhandler({
                    desc: prefixLog + watch.endLog,
                    type: "success"
                });
                next();
            });
        },
        function (next) {
            StartServer(startServer, function () {

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

    Ssh(sshObj, function () {
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
            Clean(clean, function () {
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
            Font(font, function () {
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
            Html(html, function () {
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
            Image(img, function () {
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
            Sass(sass, function () {
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
            Tpl(tpl, function () {
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
            JavaSript(js, function () {
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
            Zip(zip, function () {

            }, function () {
                loggerhandler({
                    desc: prefixLog + zip.endLog,
                    type: "success"
                });
                next();
            });
        }
    ])
}

module.exports = { dev, upload, pack };

