const gulp = require('gulp');
module.exports = function(imgObj,cb){
    gulp.src(imgObj.src)
    .pipe(gulp.dest(imgObj.dest))
    .on('end',function(){
        console.log(imgObj.logInfo || `图片处理成功`);
        cb ? cb(): undefined;
    });
}