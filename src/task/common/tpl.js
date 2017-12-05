const gulp = require('gulp'),
      tmodjs = require('gulp-tmod'),
      reload = require('./util').reload;
module.exports  = function(tplObj,cb){
    gulp.src(tplObj.src)
    .pipe(tmodjs({
        templateBase: tplObj.basePath,
        combo: true,
        type: 'amd',
        // output: tplObj.dest,
        helpers: tplObj.helperJs || ''
    }))
    .pipe(gulp.dest(tplObj.dest))
    .on('end',function(){
        console.log(tplObj.logInfo || `tpl编译成功`);
        cb ? cb(): undefined;
        reload ? reload() : undefined;
    });
}
