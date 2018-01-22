
/**
 * tpl 操作
 */

const gulp = require('gulp');
const tmodjs = require('gulp-tmod');
const plumber = require('gulp-plumber');

module.exports = function (config = {}, cbs = {}) {
    const {
        src, srcBase, dest, helperJs
    } = config;
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
        .pipe(tmodjs({
            templateBase: srcBase,
            combo: true,
            type: 'amd',
            outputBase: dest,
            helpers: helperJs || ''
        }))
        .pipe(gulp.dest(dest))
        .on('end', () => {
            end();
        });

    return stream;
};
