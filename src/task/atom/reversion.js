
/**
 * rem 操作
 */

const gulp = require('gulp');
const RevAll = require('weflow-rev-all');
const revDel = require('gulp-rev-delete-original');

module.exports = function (config = {}, startCb, endCb) {

    const { src, dest } = config;

    startCb && startCb();

    var revAll = new RevAll({
        fileNameManifest: "fhflow.config.json",
        dontRenameFile: [".html",".php"]
    })

    gulp.src(src)
        .pipe(revAll.revision())
        .pipe(gulp.dest(dest))
        .pipe(revDel({
            exclude: /(.html|.htm)$/
        }))
        .pipe(revAll.manifestFile())
        .pipe(gulp.dest(dest))
        .on('end', function () {
            endCb && endCb();
        });

}