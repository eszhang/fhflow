
/**
 * iconfont 操作
 */

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const iconfont = require('gulp-iconfont');
const consolidate = require('gulp-consolidate');

module.exports = function (config = {}, cbs = {}) {
    const {
        svgSrc, fontName, cssSrc, fontPath, className, version, cssDest, fontsDest
    } = config;
    const {
        start = function () { },
        log = function () { },
        end = function () { }
    } = cbs;

    start();

    const stream = gulp.src(svgSrc)
        .pipe(plumber((err) => {
            log(err);
        }))
        .pipe(iconfont({ fontName }))
        .on('codepoints', (codepoints) => {
            gulp.src(cssSrc)
                .pipe(plumber((err) => {
                    log(err);
                }))
                .pipe(consolidate('lodash', {
                    glyphs: codepoints,
                    fontName,
                    fontPath,
                    className,
                    version: `${version}.${+new Date()}`
                }))
                .pipe(gulp.dest(cssDest));
        })
        .pipe(gulp.dest(fontsDest))
        .on('end', () => {
            end();
        });
    return stream;
};

