
/**
 * zip 操作
 */

const gulp = require('gulp')
const zip = require('gulp-zip');
const utils = require('../util/index');
module.exports = function (config = {}, startCb, endCb) {

    const { projectName, version, srcArray, srcBase, dist, type, fileRegExp, packageModules } = config;

    let date = new Date();

    startCb && startCb();
    //  用于记录是不是最后一个打包已经完成
    var packNo = 0;

    let year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate();
    month = month > 9 ? month : '0' + month;
    day = day > 9 ? day : '0' + day;

    let time = '' + year + month + day;
    if (srcArray.length === 0) {
        let name = fileRegExp.replace(/\${name}/g, projectName)
            .replace(/\${version}/g, version).replace(/\${time}/g, time);
        name = name + '.' + type;
        gulp.src(srcBase + '\\**\\*')
            .pipe(zip(name))
            .pipe(gulp.dest(dist))
            .on('end', function () {
                endCb && endCb();
            });
    } else {
        for (var i = 0; i < srcArray.length; i++) {
            let name = fileRegExp.replace(/\${name}/g, projectName).replace(/\${moduleName}/g, packageModules[i])
                .replace(/\${version}/g, version).replace(/\${time}/g, time);
            name = name + '.' + type;

            if(packageModules[i]==='common' && utils.isDirExist(srcBase + '/oasisl') && utils.readFistLevelFolder(srcBase + '/oasisl').length !== 0){
                srcArray[i].push(srcBase + '/oasisl/**/*.*')
            }

            gulp.src(srcArray[i], { base: srcBase })
                .pipe(zip(name))
                .pipe(gulp.dest(dist))
                .on('end', function () {
                    if(packNo++ == (srcArray.length-1) ){
                        endCb && endCb();
                    }
                });
            
        }
    }
}