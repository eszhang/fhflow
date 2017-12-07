
/**
 * html 操作
 */

const gulp = require('gulp');
const fileinclude = require('gulp-file-include');

module.exports = function (config = {}, startCb, endCb) {

    const { src, srcBase, dest } = config;

    startCb && startCb();

    let stream = gulp.src(src, { base: srcBase })
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(dest))
        .on('end', function () {
            endCb && endCb();
        });

    return stream;
}

