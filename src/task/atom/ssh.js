
/**
 * ssh 操作
 */

const gulp = require('gulp');
const gulpSSH = require('gulp-ssh');
const rap = require('./rap');
const sftp = require('gulp-sftp');
const async = require('async');
const cleanHandler = require('./clean');

// 将build目录下的js文件,去除rap后复制到release目录下
function removeRap(config = {}, cb = function () {}) {
    gulp.src(`${config.srcBase}/**/*.js`)
        .pipe(rap())
        .pipe(gulp.dest(config.destBase)).on('end', () => {
            cb();
        });
}

// 将build目录下除了js以外的文件复制到release目录下
function copyOthers(config, cb = function () {}) {
    const src = [`${config.srcBase}/**/**`, `!${config.srcBase}/**/*.js`];
    gulp.src(src)
        .pipe(gulp.dest(config.destBase)).on('end', () => {
            cb();
        });
}

// 将release目录下的文件上传到服务器
function upload(config, cb = function () {}) {
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
    const ignoreArray = config.ignoreFileRegExp.split(';').filter(item => item !== '');
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
            copyOthers(config, next);
        },
        function (next) {
            removeRap(config, next);
        },
        function (next) { 
            cleanHandler({ src: ignoreArray }, () => {}, () => {
                next();
            });
        },
        function (next) {
            upload(config, next);
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

