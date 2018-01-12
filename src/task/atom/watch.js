
/**
 * watch 操作
 */
const path = require('path');
const watchAtom = require('gulp-watch');
const delAtom = require('del');
const htmlAtom = require('./html');
const sassAtom = require('./sass');
const javaSriptAtom = require('./javascript');
const tplAtom = require('./tpl');
const imageAtom = require('./image');
const fontAtom = require('./font');
const remAtom = require('./rem');
const cache = require('./cache');
const chalk = require('../utils/chalk');

module.exports = function (config = {}, cbs = {}) {
    const {
        html, sass, js, tpl, img, font, watch, bs
    } = config;
    const { srcBase, watchPath, liverload } = watch;
    const {
        start = function () { },
        log = function () { },
        end = function () { }
    } = cbs;


    start();

    const watcher = watchAtom(watchPath, { ignored: /[\\/\\]\./ });
    cache[bs.name] = watcher;

    function watchHandler(type, file) {
        let target = file.split(srcBase)[1].match(/[\\/\\](\w+)[\\/\\]/);
        if (target.length && target[1]) {
            target = target[1];
        }
        log(`${chalk.yellow('☷')}  ${path.normalize(file).match(/src.+/)[0]} has been ${chalk.yellow(type)}`);

        switch (target) {
            case 'images':
                if (type === 'removed') {
                    const tmp = file.replace(srcBase, 'build\\assets');
                    delAtom([tmp], { force: true }).then(() => {
                        liverload && bs.reload();
                    });
                } else {
                    imageAtom(img, {
                        end() {
                            liverload && bs.reload();
                        },
                        log(err) {
                            log(`${chalk.red('☼  Error bug :')}\n${err}`);
                        }
                    });
                }
                break;
            case 'js':
                if (type === 'removed') {
                    const tmp = file.replace(srcBase, 'build\\assets');
                    delAtom([tmp], { force: true }).then(() => {
                        liverload && bs.reload();
                    });
                } else {
                    javaSriptAtom(js, {
                        end() {
                            liverload && bs.reload();
                        },
                        log(err) {
                            log(`${chalk.red('☼  Error bug :')}\n${err}`);
                        }
                    });
                }
                break;
            case 'scss':
                if (type === 'removed') {
                    const tmp = file.replace(`${srcBase}\\scss`, 'build\\assets\\css').replace('.scss', '.css');
                    const tmp2 = tmp.replace('.css', '.css.map');
                    delAtom([tmp, tmp2], { force: true }).then(() => {
                        liverload && bs.reload();
                    });
                } else {
                    sassAtom(sass, {
                        end() {
                            if (config.compileAutoprefixer) {
                                remAtom(config.compileAutoprefixer, {
                                    end() {
                                        liverload && bs.reload();
                                    },
                                    log(err) {
                                        log(`${chalk.red('☼  Error bug :')}\n${err}`);
                                    }
                                });
                            } else {
                                liverload && bs.reload();
                            }
                        },
                        log(err) {
                            log(`${chalk.red('☼  Error bug :')}\n${err}`);
                        }
                    });
                }
                break;
            case 'view':
                if (type === 'removed') {
                    const tmp = file.replace(srcBase, 'build');
                    delAtom([tmp], { force: true }).then(() => {
                        liverload && bs.reload();
                    });
                } else {
                    htmlAtom(html, {
                        end() {
                            liverload && bs.reload();
                        },
                        log(err) {
                            log(`${chalk.red('☼  Error bug :')}\n${err}`);
                        }
                    });
                }
                break;
            case 'tpl':
                if (type === 'removed') {
                    const tmp = file.replace(`${srcBase}\\tpl`, 'build\\assets\\template').replace('.tpl', '.js');
                    delAtom([tmp], { force: true }).then(() => {
                        liverload && bs.reload();
                    });
                } else {
                    tplAtom(tpl, {
                        end() {
                            liverload && bs.reload();
                        },
                        log(err) {
                            log(`${chalk.red('☼  Error bug :')}\n${err}`);
                        }
                    });
                }
                break;
            case 'font':
                if (type === 'removed') {
                    const tmp = file.replace(srcBase, 'build\\assets');
                    delAtom([tmp], { force: true }).then(() => {
                        liverload && bs.reload();
                    });
                } else {
                    fontAtom(font, {
                        end() {
                            liverload && bs.reload();
                        },
                        log(err) {
                            log(`${chalk.red('☼  Error bug :')}\n${err}`);
                        }
                    });
                }
                break;
            default:
                break;
        }
    }

    watcher.on('change', (file) => {
        watchHandler('changed', file);
    }).on('add', (file) => {
        watchHandler('add', file);
    }).on('unlink', (file) => {
        watchHandler('removed', file);
    });

    end();
};
