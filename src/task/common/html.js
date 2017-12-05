const gulp = require('gulp'),
      fileinclude = require('gulp-file-include'),
      reload = require('./util').reload;

module.exports = function(config = {},cb){
    const { src, baseSrc, dest }
    gulp.src(htmlObj.src,{
        base: htmlObj.baseSrc
    })
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(gulp.dest(htmlObj.dest))
    .on('end',function(){
        cb && cb();
        reload && reload();
    });
}

