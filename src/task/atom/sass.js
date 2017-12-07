
/**
 * sass 操作
 */

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const sourceMap = require('gulp-sourcemaps');
const compass = require('gulp-compass');
const minifyCss = require('gulp-clean-css');

module.exports = function (config = {}, startCb, endCb) {

    const { src, srcBase, dest, compassSetting, isCompress, isOpenSourceMap } = config;

    startCb && startCb();

    let stream = gulp.src(src)
        .pipe(compass({
            css: dest,
            sass: srcBase,
            image: compassSetting.imageDest,
            font: compassSetting.fontSrc,
            style: isCompress ? 'compressed' : 'compact',
            sourcemap: isOpenSourceMap ? true : false
        }))
        .pipe(gulp.dest(dest))
        .on('end', function () {
            endCb && endCb();
        });

    return stream;
}