
/**
 * run dev task
 */

const path = require('path');
const async = require('async');

const htmlHandler = require(path.join(__dirname, '../atom/html'));
const sassHandler = require(path.join(__dirname, '../atom/sass'));
const cleanHandler = require(path.join(__dirname, '../atom/clean'));
const javascriptHandler = require(path.join(__dirname, '../atom/javascript'));
const tplHandler = require(path.join(__dirname, '../atom/tpl'));
const imageHandler = require(path.join(__dirname, '../atom/image'));
const fontHandler = require(path.join(__dirname, '../atom/font'));
const copyHandler = require(path.join(__dirname, '../atom/copy'));
const iconfontHandler = require(path.join(__dirname, '../atom/iconfont'));
const startServerHandler = require(path.join(__dirname, '../atom/server')).startServer;
const watchHandler = require(path.join(__dirname, '../atom/watch'));
const remHandler = require(path.join(__dirname, '../atom/rem'));
const reversionHandler = require(path.join(__dirname, '../atom/reversion'));
const { requireUncached, isFileExist, isDirExist } = require(path.join(__dirname, '../util/index'));

const { getDevObj, getPackObj, getUploadObj } = require(path.join(__dirname, '../task.config.js'));

let { constantConfig, cacheConfig } = require(path.join(__dirname, '../common/index')),
    {
        NAME, ROOT, WORKSPACE, CONFIGNAME, CONFIGPATH, PLATFORM, DEFAULT_PAT, TEMPLAGE_PROJECT, TEMPLAGE_EXAMPLE, EXAMPLE_NAME
    } = constantConfig;

const projectPath = 'C:/Users/Administrator/Desktop/fhflow_workspace/fhflow1513849276070';

let curConfigPath = path.join(projectPath, CONFIGNAME),
    setting = requireUncached(curConfigPath);

const devConfig = getDevObj({
    path: projectPath,
    packageModules: setting.choseModules,
    setting
});

const bs = require('browser-sync').create(projectPath);

const {
    clean, sass, css, font, html, img, js, tpl, iconfont, startServer, watch, others, oasisl
} = devConfig;

    // 加入控制修改后刷新
watch.liverload = setting.server.liverload;
watch.startServerPath = startServer.path;

async.series([
    function (next) {
        cleanHandler(clean, () => {
        }, () => {
            next();
        });
    },
    function (next) {
        fontHandler(font, () => {
        }, () => {
            next();
        });
    },
    function (next) {
        htmlHandler(html, () => {
        }, () => {
            next();
        });
    },
    function (next) {
        imageHandler(img, () => {
        }, () => {
            next();
        });
    },
    function (next) {
        sassHandler(sass, () => {
        }, () => {
            next();
        }); sassHandler(sass, () => {
        }, () => {
            next();
        });
    },
    function (next) {
        if (devConfig.compileAutoprefixer !== undefined) {
            remHandler(devConfig.compileAutoprefixer, () => {
            }, () => {
                next();
            });
        } else {
            next();
        }
    },
    function (next) {
        tplHandler(tpl, () => {
        }, () => {
            next();
        });
    },
    function (next) {
        javascriptHandler(js, () => {
        }, () => {
            next();
        });
    },
    function (next) {
        iconfontHandler(iconfont, () => {
        }, () => {
            next();
        });
    },
    function (next) {
        copyHandler(css, () => {
        }, () => {
            next();
        });
    },
    function (next) {
        copyHandler(others, () => {
        }, () => {
            next();
        });
    },
    function (next) {
        copyHandler(oasisl, () => {
            // 不是所有项目都有oasisl所以不打印日志了
        }, () => {
            next();
        });
    },
    function (next) {
        if (devConfig.reversion !== undefined) {
            reversionHandler(devConfig.reversion, () => {
            }, () => {
                next();
            });
        } else {
            next();
        }
    }
]);

console.log(333);

process.on('uncaughtException', (err) => {
    console.error('An uncaught error occurred!');
    console.error(err.stack);
});
