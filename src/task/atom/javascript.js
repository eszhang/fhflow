
/**
 * javascript 操作
 */

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const rap = require('./rap.js');

module.exports = function (config = {}, cbs = {}) {
    const {
        src, srcBase, dest, isDelRap, isMinify
    } = config;
    const {
        start = function () { },
        log = function () { },
        end = function () { }
    } = cbs;

    start();

    let stream = gulp.src(src, { base: srcBase })
        .pipe(plumber((err) => {
            log(err);
        }));

    if (isDelRap) {
        stream = stream.pipe(rap());
    }

    if (isMinify) {
        stream = stream.pipe(uglify());
    }

    stream = stream.pipe(gulp.dest(dest))
        .on('end', () => {
            end();
        });

    return stream;
};

