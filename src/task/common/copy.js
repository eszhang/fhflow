const gulp = require('gulp'),
    rap = require('./rap.js');

module.exports = function(copyObj,cb){
    gulp.src(copyObj.src)
    .pipe(gulp.dest(copyObj.dest))
    .on('end',function(){
        console.log(copyObj.logInfo || `拷贝成功`);
        cb ? cb(): undefined;
    });
}