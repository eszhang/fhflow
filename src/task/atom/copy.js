
/**
 * copy 操作
 */

const gulp = require('gulp');

module.exports = (config = {}, cbs) => {
    const { src, dest, srcBase } = config;
    const {
        start = function () { },
        log = function () { },
        end = function () { }
    } = cbs;

    start();

    const stream = gulp.src(src, { base: srcBase })
        .pipe(gulp.dest(dest))
        .on('error', (err) => {
            log(err.message);
            end();
        })
        .on('end', () => {
            log();
            end();
        });

    return stream;
};
