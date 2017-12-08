
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

let { getDevObj, getPackObj } = require('./task.config.js');

let { constantConfig, cacheConfig } = require('./common/index'),
    { NAME, ROOT, WORKSPACE, CONFIGNAME, CONFIGPATH, PLATFORM, DEFAULT_PAT, TEMPLAGE_PROJECT, TEMPLAGE_EXAMPLE, EXAMPLE_NAME } = constantConfig,
    { curConfigPath } = cacheConfig;

/*
 * dev task
 */
function dev(projectPath, loggerhandler) {

    curConfigPath = path.join(projectPath, CONFIGNAME);
    let setting = requireUncached(curConfigPath);

    let devConfig = getDevObj({
        path: projectPath,
        packageModules: setting.modules,
        setting: setting
    });

    let { clean, sass, font, html, img, js, tpl, startServer, watch } = devConfig;

    loggerhandler({
        desc: "dev 模式已打开...",
        type: "warning"
    });

    async.series([
        function (next) {
            Clean(clean, function () {
                loggerhandler({
                    desc: clean.startLog,
                    type: "info"
                });
            }, function () {
                loggerhandler({
                    desc: clean.endLog,
                    type: "success"
                });
                next();
            });
        },
        function (next) {
            Font(font, function () {
                loggerhandler({
                    desc: font.startLog,
                    type: "info"
                });
            }, function () {
                loggerhandler({
                    desc: font.endLog,
                    type: "success"
                });
                next();
            });
        },
        function (next) {
            Html(html, function () {
                loggerhandler({
                    desc: html.startLog,
                    type: "info"
                });
            }, function () {
                loggerhandler({
                    desc: html.endLog,
                    type: "success"
                });
                next();
            });
        },
        function (next) {
            Image(img, function () {
                loggerhandler({
                    desc: img.startLog,
                    type: "info"
                });
            }, function () {
                loggerhandler({
                    desc: img.endLog,
                    type: "success"
                });
                next();
            });
        },
        function (next) {
            Sass(sass, function () {
                loggerhandler({
                    desc: sass.startLog,
                    type: "info"
                });
            }, function () {
                loggerhandler({
                    desc: sass.endLog,
                    type: "success"
                });
                next();
            });
        },
        function (next) {
            Tpl(tpl, function () {
                loggerhandler({
                    desc: tpl.startLog,
                    type: "info"
                });
            }, function () {
                loggerhandler({
                    desc: tpl.endLog,
                    type: "success"
                });
                next();
            });
        },
        function (next) {
            JavaSript(js, function () {
                loggerhandler({
                    desc: js.startLog,
                    type: "info"
                });
            }, function () {
                loggerhandler({
                    desc: js.endLog,
                    type: "success"
                });
                next();
            });
        },
        function (next) {
            Watch(watch, devConfig, function () {

            }, function () {
                loggerhandler({
                    desc: watch.endLog,
                    type: "success"
                });
                next();
            });
        },
        function (next) {
            StartServer(startServer, function () {

            }, function () {
                loggerhandler({
                    desc: startServer.endLog,
                    type: "success"
                });
                next();
            });
        }
    ])
}

function upload(projectPath, loggerhandler) {
    
    let setting = requireUncached(curConfigPath);
    let sshObj = getUploadObj(setting);

    loggerhandler({
        desc: "upload 模式已打开...",
        type: "warning"
    });

    Ssh(sshObj,function(){
        loggerhandler({
            desc: sshObj.startLog,
            type: "info"
        },{
            desc: sshObj.endtLog,
            type: "success"
        });
    });
}

function pack(projectPath, loggerhandler) {

    curConfigPath = path.join(projectPath, CONFIGNAME);

    let setting = requireUncached(curConfigPath);

    let packConfig = getPackObj({
        path: projectPath,
        packageModules: setting.modules,
        setting: setting
    });

    let { clean, sass, font, html, img, js, tpl, zip } = packConfig;

    loggerhandler({
        desc: "pack 模式已打开...",
        type: "warning"
    });

    async.series([
        function (next) {
            Clean(clean, function () {
                loggerhandler({
                    desc: clean.startLog,
                    type: "info"
                });
            }, function () {
                loggerhandler({
                    desc: clean.endLog,
                    type: "success"
                });
                next();
            });
        },
        function (next) {
            Font(font, function () {
                loggerhandler({
                    desc: font.startLog,
                    type: "info"
                });
            }, function () {
                loggerhandler({
                    desc: font.endLog,
                    type: "success"
                });
                next();
            });
        },
        function (next) {
            Html(html, function () {
                loggerhandler({
                    desc: html.startLog,
                    type: "info"
                });
            }, function () {
                loggerhandler({
                    desc: html.endLog,
                    type: "success"
                });
                next();
            });
        },
        function (next) {
            Image(img, function () {
                loggerhandler({
                    desc: img.startLog,
                    type: "info"
                });
            }, function () {
                loggerhandler({
                    desc: img.endLog,
                    type: "success"
                });
                next();
            });
        },
        function (next) {
            Sass(sass, function () {
                loggerhandler({
                    desc: sass.startLog,
                    type: "info"
                });
            }, function () {
                loggerhandler({
                    desc: sass.endLog,
                    type: "success"
                });
                next();
            });
        },
        function (next) {
            Tpl(tpl, function () {
                loggerhandler({
                    desc: tpl.startLog,
                    type: "info"
                });
            }, function () {
                loggerhandler({
                    desc: tpl.endLog,
                    type: "success"
                });
                next();
            });
        },
        function (next) {
            JavaSript(js, function () {
                loggerhandler({
                    desc: js.startLog,
                    type: "info"
                });
            }, function () {
                loggerhandler({
                    desc: js.endLog,
                    type: "success"
                });
                next();
            });
        },
        function (next) {
            Zip(zip, function(){
                
            },function(){
                loggerhandler({
                    desc: zip.endLog,
                    type: "success"
                });
                next();
            });
        }
    ])
}

module.exports = { dev, upload, pack };

