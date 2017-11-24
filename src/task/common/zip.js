const gulp = require('gulp')
      zip = require('gulp-zip');
module.exports = function(zipObj, cb){
    var date = new Date();
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        month = month > 9 ? month : '0' + month;
        day = day > 9 ? day : '0' + day;
    var name = zipObj.projectName + '-frontend-install-runtime-' + zipObj.version + '-as6u3-x86_64-' + year + month + day + '.zip'
    gulp.src(zipObj.src)
        .pipe(zip(name))
        .pipe(gulp.dest('')) .on('end',function(){
            console.log(zipObj.logInfo || `打包完成`);
            cb ? cb(): undefined;
        });
    }