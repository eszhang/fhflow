const gulp = require('gulp')
      zip = require('gulp-zip');
module.exports = function(zipObj, cb){
    var date = new Date();
    var name = zipObj.projectName + '-frontend-install-runtime-' + zipObj.version + '-as6u3-x86_64-' + date.getFullYear() + (date.getMonth + 1) + date.getDate() + '.zip'
    gulp.src(zipObj.src)
        .pipe(zip(name))
        .pipe(gulp.dest(''));
}