
/**
 * ssh 操作
 */

const gulp = require('gulp');
const gulpSSH = require('gulp-ssh');
const rap = require('./rap');
const sftp = require('gulp-sftp');
const async = require('async');
const cleanHandler = require('./clean');
function upload2TestJs(config = {}, cb) {
    gulp.src(config.srcBase + '/**/*.js')
        .pipe(rap())
        .pipe(gulp.dest(config.destBase)).on('end', function () {
            cb && cb();
        });
}
function upload2TestOther(config, cb) {
    var src = [config.srcBase + '/**/**', '!' + config.srcBase + '/**/*.js'];
    gulp.src(src)
        .pipe(gulp.dest(config.destBase)).on('end', function () {
            cb && cb();
        });
}
function upload2T(config, cb) {
    config.sft['callback'] = function(){
        cb && cb();
    }
    gulp.src([config.destBase + '/**/**'])
        .pipe(sftp(config.sft))
}
module.exports = function (config, startCb, endCb) {
    //过滤不需要匹配的文件
    var ignoreArray = config.ignoreFileRegExp.split(';').filter(function(item) {
            return '' != item;
        });
    startCb && startCb();
    async.series([
        function (next) {
            cleanHandler({src: config.destBase+'/**'}, function () {}, function () {
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
            cleanHandler({src: ignoreArray}, function () {}, function () {
                next();
            });
        },
        function (next) {
            upload2T(config, next);
        },
        function (next) {
            endCb && endCb();
        }
    ])

}