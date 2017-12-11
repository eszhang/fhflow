
/**
 * zip 操作
 */

const gulp = require('gulp')
const zip = require('gulp-zip');

module.exports = function (config = {}, startCb, endCb) {

    const { projectName, version, srcArray, srcBase, dist, type, fileRegExp, packageModules } = config;

    let date = new Date();

    startCb && startCb();

    let year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate();
    month = month > 9 ? month : '0' + month;
    day = day > 9 ? day : '0' + day;

    let time = '' + year + month + day;
    if(srcArray.length === 0){
        let name = fileRegExp.replace(/\${name}/g, projectName).replace(/\${moduleName}/g, packageModules[i])
                .replace(/\${version}/g, version).replace(/\${time}/g, time);
            name = name + '.' + type;
            gulp.src(srcBase)
                .pipe(zip(name))
                .pipe(gulp.dest(dist))
                .on('end', function () {
                // endCb && endCb();
                });
    }else{
        for (var i = 0; i < srcArray.length; i++) {
            let name = fileRegExp.replace(/\${name}/g, projectName).replace(/\${moduleName}/g, packageModules[i])
                .replace(/\${version}/g, version).replace(/\${time}/g, time);
            name = name + '.' + type;
            gulp.src(srcArray[i], { base: srcBase })
                .pipe(zip(name))
                .pipe(gulp.dest(dist))
                .on('end', function () {
                // endCb && endCb();
                });
        }
    }
}