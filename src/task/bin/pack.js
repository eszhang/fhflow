
/**
 * pack task
 */

const path = require('path');
const async = require('async');
const htmlHandler = require('../atom/html');
const sassHandler = require('../atom/sass');
const cleanHandler = require('../atom/clean');
const javascriptHandler = require('../atom/javascript');
const tplHandler = require('../atom/tpl');
const imageHandler = require('../atom/image');
const fontHandler = require('../atom/font');
const copyHandler = require('../atom/copy');
const iconfontHandler = require('../atom/iconfont');
const remHandler = require('../atom/rem');
const reversionHandler = require('../atom/reversion');
const zipHandler = require('../atom/zip');

const chalk = require('../utils/chalk');
const { requireUncached } = require('../utils/file');

const { getPackObj } = require('./config.js');
const constantConfig = require('../constant/config');

const { CONFIGNAME } = constantConfig;

function pack(projectPath, loggerhandler, fn) {
    const curConfigPath = path.join(projectPath, CONFIGNAME);
    const setting = requireUncached(curConfigPath);

    const packConfig = getPackObj({
        path: projectPath,
        packageModules: setting.choseModules,
        setting
    });

    const {
        clean, sass, css, font, html, img, js, iconfont, tpl, zip, others, oasisl
    } = packConfig;

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

    loggerhandler(`${chalk.blue('☆')}  Dist模式已启动...`);

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
            if (packConfig.compileAutoprefixer !== undefined) {
                remHandler(packConfig.compileAutoprefixer, generateCbs('compile-autoprefixer', next));
            } else {
                next();
            }
        },
        function (next) {
            javascriptHandler(js, generateCbs('compile-javascript', next));
        },
        function (next) {
            if (packConfig.reversion !== undefined) {
                reversionHandler(packConfig.reversion, generateCbs('reversion', next));
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
            zipHandler(zip, {
                start() {
                    loggerhandler(`${chalk.blue('○')}  Starting  '${chalk.lightBlue('zip')}'...`);
                },
                end() {
                    loggerhandler(`${chalk.blue('✔')}  Finished  '${chalk.lightBlue('zip')}'...`);
                    fn && fn();
                    next();
                },
                log(err) {
                    loggerhandler(`${chalk.red('☼  Error bug (the task has crashed and stopped, please fix the bug recompiling) :')}\n${err}`);
                }
            });
        }
    ]);
}

module.exports = pack;

