
/**
 * run dev task
 */

const path = require('path');
const async = require('async');
const browserSync = require('browser-sync');
const htmlHandler = require('../atom/html');
const sassHandler = require('../atom/sass');
const cleanHandler = require('../atom/clean');
const javascriptHandler = require('../atom/javascript');
const tplHandler = require('../atom/tpl');
const imageHandler = require('../atom/image');
const fontHandler = require('../atom/font');
const copyHandler = require('../atom/copy');
const iconfontHandler = require('../atom/iconfont');
const startServerHandler = require('../atom/server').startServer;
const watchHandler = require('../atom/watch');
const remHandler = require('../atom/rem');
const reversionHandler = require('../atom/reversion');

const chalk = require('../utils/chalk');
const { requireUncached } = require('../utils/file');

const { getDevObj } = require('./config.js');
const constantConfig = require('../constant/config');

const { CONFIGNAME } = constantConfig;

function dev(projectPath, loggerhandler, fn) {
    const curConfigPath = path.join(projectPath, CONFIGNAME);
    const setting = requireUncached(curConfigPath);

    const devConfig = getDevObj({
        path: projectPath,
        packageModules: setting.choseModules,
        setting
    });

    const {
        clean, sass, css, font, html, img, js, tpl, iconfont, startServer, watch, others, oasisl
    } = devConfig;

    const bs = browserSync.create(projectPath);

    const generateCbs = (taskName, next = () => {}) => ({
        start() {
            loggerhandler(`${chalk.blue('○')}  Starting  '${chalk.lightBlue(taskName)}'...`);
        },
        end() {
            loggerhandler(`${chalk.blue('✔')}  Finished  '${chalk.lightBlue(taskName)}'...`);
            next();
        },
        log(err) {
            loggerhandler(`${chalk.red('☼  Error bug (the task has crashed and stopped, please fix the bug recompiling) :')}\n${err}`);
        }
    });

    // 加入控制修改后刷新
    watch.liverload = setting.server.liverload;
    watch.startServerPath = startServer.path;

    loggerhandler(`${chalk.blue('☆')}  Dev模式已启动...`);

    async.series([
        function (next) {
            cleanHandler(clean, generateCbs('clean', next));
        },
        function (next) {
            fontHandler(font, generateCbs('compile-font', next));
        },
        function (next) {
            iconfontHandler(iconfont, generateCbs('compile-iconfont', next));
        },
        function (next) {
            imageHandler(img, generateCbs('compile-image', next));
        },
        function (next) {
            htmlHandler(html, generateCbs('compile-html', next));
        },
        function (next) {
            tplHandler(tpl, generateCbs('compile-template', next));
        },
        function (next) {
            sassHandler(sass, generateCbs('compile-sass', next));
        },
        function (next) {
            if (devConfig.compileAutoprefixer !== undefined) {
                remHandler(devConfig.compileAutoprefixer, generateCbs('compile-autoprefixer', next));
            } else {
                next();
            }
        },
        function (next) {
            javascriptHandler(js, generateCbs('compile-javascript', next));
        },
        function (next) {
            if (devConfig.reversion !== undefined) {
                reversionHandler(devConfig.reversion, generateCbs('reversion', next));
            } else {
                next();
            }
        },
        function (next) {
            copyHandler(css, generateCbs('copy-css', next));
        },
        function (next) {
            copyHandler(others, generateCbs('copy-others', next));
        },
        function (next) {
            // 不是所有项目都有oasisl所以不打印日志了
            copyHandler(oasisl, {
                end() {
                    next();
                }
            });
        },
        function (next) {
            devConfig.bs = bs;
            watchHandler(devConfig, {
                end() {
                    loggerhandler(`${chalk.blue('✔')}  starting  '${chalk.lightBlue('watch')}'...`);
                    next();
                },
                log(err) {
                    loggerhandler(err);
                }
            });
        },
        function (next) {
            startServer.bs = bs;
            startServerHandler(startServer, {
                end() {
                    loggerhandler(`${chalk.blue('✔')}  starting  '${chalk.lightBlue('server')}'...`);
                    fn && fn();
                    next();
                },
                log(err) {
                    loggerhandler(err);
                }
            });
        }
    ]);
}

module.exports = dev;

