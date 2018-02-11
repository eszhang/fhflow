
/**
 * rem 操作
 */

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const postcssPxtorem = require('postcss-pxtorem');
const postcssAutoprefixer = require('autoprefixer');

module.exports = function (config = {}, cbs = {}) {
    const { src, dest } = config;
    const {
        start = function () { },
        log = function () { },
        end = function () { }
    } = cbs;

    start();

    const stream = gulp.src(src)
        .pipe(plumber((err) => {
            log(err);
        }))
        .pipe(postcss([
            postcssAutoprefixer({ browsers: ['last 9 versions'] }),
            postcssPxtorem({
                root_value: '20',
                prop_white_list: [],
                minPixelValue: 2
            })
        ]))
        .pipe(gulp.dest(dest))
        .on('end', () => {
            end();
        });

    return stream;
};
