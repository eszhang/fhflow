const gulp = require('gulp'),
      fileinclude = require('gulp-file-include'),
      reload = require('./util').reload;

module.exports = function(htmlObj,cb){
    gulp.src('oasisl/view/hero/backflow/**/*.html')
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(gulp.dest('build/hero/backflow'))
    .on('end',function(){
        console.log(htmlObj.logInfo || `拷贝成功`);
        cb ? cb(): undefined;
        reload? reload() : undefined;
    });
}