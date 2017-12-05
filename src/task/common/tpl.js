/**
 * tpl 操作
 */
const gulp = require('gulp');
const tmodjs = require('gulp-tmod');

module.exports  = function(config,cb){

    const { src, srcBase, dest, helperJs } = config;

    gulp.src(src)
    .pipe(tmodjs({
        templateBase: srcBase,
        combo: true,
        type: 'amd',
        // output: tplObj.dest,
        helpers: helperJs || ''
    }))
    .pipe(gulp.dest(dest))
    .on('end',function(){
        cb && cb();
    });
}
