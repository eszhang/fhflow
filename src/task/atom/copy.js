
/**
 * copy 操作
 */

const gulp = require('gulp');
const del = require('del');

module.exports = function (config = {}, startCb, endCb) {

    const { src, dest, srcBase } = config;

    startCb && startCb();

    let stream = gulp.src(src, { base: srcBase })
        .pipe(gulp.dest(dest))
        .on('end', function () {
            endCb && endCb();
        });

    return stream;
}