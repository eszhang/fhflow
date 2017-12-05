
/**
 * copy 操作
 */

const gulp = require('gulp');
const del = require('del');

module.exports = function (config = {}, cb) {

    const { src, dest } = config;

    let stream = gulp.src(src)
        .pipe(gulp.dest(dest))
        .on('end', function () {
            cb && cb();
        });

    return stream;
}