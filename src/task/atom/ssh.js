
/**
 * ssh 操作
 */

const gulp = require('gulp');
const gulpSSH = require('gulp-ssh');
const rap = require('./rap');
const sftp = require('gulp-sftp');
const async = require('async');

function upload2TestJs(config = {}, cb) {
    gulp.src(config.srcBase + '/**/*.js')
        .pipe(rap())
        .pipe(gulp.dest(config.destBase)).on('end', function () {
            cb ? cb() : undefined;
        });
}
function upload2TestOther(config, cb) {
    var src = [config.srcBase + '/**/**', '!' + config.srcBase + '/**/*.js'];
    // 过滤不需要匹配的文件
    var ignoreArray = config.ignoreFileRegExp.split(';').filter(function(item) {
            return '' != item;
        });
        src.push(...ignoreArray);

    gulp.src(src)
        .pipe(gulp.dest(config.destBase)).on('end', function () {
            cb ? cb() : undefined;
        });
}
function upload2T(config, cb) {
    gulp.src(['release/**/**'])
        .pipe(sftp(config.sft)).on('end', function () {
            cb ? cb() : undefined;
        });
}
module.exports = function (config, startCb, endCb) {

    startCb && startCb();
    async.series([
        function (next) {
            upload2TestOther(config, next);
        },

        function (next) {
            upload2TestJs(config, next);
        },
        function (cb) {
            upload2T(config, cb);
        },
        function (next) {
            endCb && endCb();
        }
    ])

}