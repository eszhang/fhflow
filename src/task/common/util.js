const gulp = require('gulp'),
      bs = require('./startServer').bs;
 let reload = function(){
    bs.reload();
}

let copy = function(copyObj,cb){
    gulp.src(copyObj.src)
    .pipe(gulp.dest(copyObj.dest))
    .on('end',function(){
        console.log(copyObj.logInfo || `拷贝成功`);
        cb ? cb(): undefined;
        reload? reload() : undefined;
    });
}

module.exports = {copy,reload};