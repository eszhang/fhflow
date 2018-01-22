
/**
 * html 操作
 */

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const fileinclude = require('gulp-file-include');

module.exports = function (config = {}, cbs = {}) {
    const { src, srcBase, dest } = config;
    const {
        start = function () { },
        log = function () { },
        end = function () { }
    } = cbs;

    start();

    const stream = gulp.src(src, { base: srcBase })
        .pipe(plumber((err) => {
            log(err);
        }))
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(dest))
        .on('end', () => {
            end();
        });

    return stream;
};

