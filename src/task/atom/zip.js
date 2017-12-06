/**
 * zip 操作
 */

const gulp = require('gulp')
const zip = require('gulp-zip');
module.exports = function(config, cb){

    const { projectName, version, srcArray, srcBase, dist } = config;

    let date = new Date();
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        month = month > 9 ? month : '0' + month,
        day = day > 9 ? day : '0' + day,
        name = projectName + '-frontend-install-runtime-' + version + '-as6u3-x86_64-' + year + month + day + '.zip';
        for(var i = 0; i < srcArray.length; i++){
            name = i + name;
            console.log(name)
            gulp.src(srcArray[i], { base: srcBase })
                .pipe(zip(name))
                .pipe(gulp.dest(dist)) .on('end',function(){
                    // cb && cb();
                });
        }    
    }