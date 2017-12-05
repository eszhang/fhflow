const gulp = require('gulp'),
      uglify = require('gulp-uglify'),
      rap  = require('./rap.js'),
      reload = require('./util').reload;

module.exports = function(jsObj,cb){
    var stream = gulp.src(jsObj.src);
    if(jsObj.isDelRap){
       stream = stream.pipe(rap())
    }

    if(jsObj.isMinify){
       stream = stream.pipe(uglify())
    }
    

    stream = stream.pipe(gulp.dest(jsObj.dest))
    .on('end',function(){
        console.log(jsObj.logInfo || `编译js成功`);
        cb ? cb(): undefined;
        reload? reload() : undefined;
    });
}


