
/**
 * iconfont 操作
 */

const gulp = require('gulp');
const fileinclude = require('gulp-iconfont');
const consolidate = require('gulp-consolidate');

module.exports = function (config = {}, startCb, endCb) {

    const { svgSrc, fontName, cssSrc, fontPath, className, version, cssDest, fontsDest } = config;

    startCb && startCb();

    let stream = gulp.src(svgSrc)
        .pipe(iconfont({ fontName:fontName }))
        .on('codepoints', function(codepoints, options) {
                gulp.src(cssSrc)
                    .pipe(consolidate('lodash',{
                        glyphs: codepoints,
                        fontName: fontName,
                        fontPath: '../fonts',
                        className: className,
                        version: version
                    }))
            .pipe(gulp.dest(cssDest))
        })
        .pipe(gulp.dest(fontsDest))

    return stream;
}

