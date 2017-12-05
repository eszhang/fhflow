/**
 * html 操作
 */
const gulp = require('gulp');
const fileinclude = require('gulp-file-include');

module.exports = function (config = {}, cb) {
    const { src, srcBase, dest } = config;

    let stream = gulp.src(src, { base: srcBase })
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(dest))
        .on('end', function () {
            cb && cb();
        });

    return stream;
}

