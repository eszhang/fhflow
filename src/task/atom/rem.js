
/**
 * rem 操作
 */

const gulp = require('gulp');
const postcss = require('gulp-postcss');
const postcssPxtorem = require('postcss-pxtorem');
const postcssAutoprefixer = require('autoprefixer');

module.exports = function (config = {}, startCb, endCb) {

    const { src, dest, option } = config;

    startCb && startCb();

    let stream = gulp.src(src)
        .pipe(postcss([
            postcssAutoprefixer({browsers:['last 9 versions']}),
            postcssPxtorem({
                root_value: "20",
                prop_white_list: [],
                minPixelValue: 2
            })
        ]))
        stream.pipe(gulp.dest(dest))
        .on('end', function () {
            endCb && endCb();
        });

    return stream;
}