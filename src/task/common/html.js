const gulp = require('gulp'),
      fileinclude = require('gulp-file-include'),
      copy = require('./copy.js');

module.exports = function(htmlObj,cb){
    gulp.src(htmlObj.src)
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(gulp.dest(htmlObj.dest))
    .on('end',function(){
        console.log(htmlObj.logInfo || `拷贝成功`);
        cb ? cb(): undefined;
    });
}