
/**
 * rem 操作
 */

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const RevAll = require('../lib/weflow-rev-all');
const revDel = require('gulp-rev-delete-original');

module.exports = function (config = {}, cbs = {}) {
    const { src, dest } = config;
    const {
        start = function () { },
        log = function () { },
        end = function () { }
    } = cbs;

    start();

    const revAll = new RevAll({
        fileNameManifest: 'fhflow.config.json',
        dontRenameFile: ['.html', '.php']
    });

    const stream = gulp.src(src)
        .pipe(plumber((err) => {
            log(err);
        }))
        .pipe(revAll.revision())
        .pipe(gulp.dest(dest))
        .pipe(revDel({
            exclude: /(.html|.htm)$/
        }))
        .pipe(revAll.manifestFile())
        .pipe(gulp.dest(dest))
        .on('end', () => {
            end();
        });

    return stream;
};
