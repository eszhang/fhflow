
/**
 * ssh 操作
 */

const gulp = require('gulp');
const gulpSSH = require('gulp-ssh');
const rap = require('./rap');
const sftp = require('gulp-sftp');
const async = require('async');
const cleanHandler = require('./clean');

function upload2TestJs(config = {}, cb = function () {}) {
    gulp.src(`${config.srcBase}/**/*.js`)
        .pipe(rap())
        .pipe(gulp.dest(config.destBase)).on('end', () => {
            cb();
        });
}
function upload2TestOther(config, cb = function () {}) {
    const src = [`${config.srcBase}/**/**`, `!${config.srcBase}/**/*.js`];
    gulp.src(src)
        .pipe(gulp.dest(config.destBase)).on('end', () => {
            cb();
        });
}
function upload2T(config, cb = function () {}) {
    config.sft.callback = function () {
        cb();
    };
    if (config.type === 'FTP') {
        gulp.src([`${config.destBase}/**/**`])
            .pipe(gulpSSH(config.sft));
    } else {
        gulp.src([`${config.destBase}/**/**`])
            .pipe(sftp(config.sft));
    }
}
module.exports = function (config = {}, cbs = {}) {
    // 过滤不需要匹配的文件
    const ignoreArray = config.ignoreFileRegExp.split(';').filter(item => item != '');
    const {
        start = function () { },
        log = function () { },
        end = function () { }
    } = cbs;

    start();
    async.series([
        function (next) {
            cleanHandler({ src: `${config.destBase}/**` }, () => {}, () => {
                next();
            });
        },
        function (next) {
            upload2TestOther(config, next);
        },
        function (next) {
            upload2TestJs(config, next);
        },
        function (next) {
            cleanHandler({ src: ignoreArray }, () => {}, () => {
                next();
            });
        },
        function (next) {
            upload2T(config, next);
        },
        function (next) {
            end();
            next();
        }
    ], (err) => {
        if (err) {
            log(err);
        }
    });
};

