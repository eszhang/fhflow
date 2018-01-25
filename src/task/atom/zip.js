
/**
 * zip 操作
 */

const gulp = require('gulp');
const zip = require('gulp-zip');
const plumber = require('gulp-plumber');
const { isDirExist, readFistLevelFolder } = require('../utils/file');

module.exports = function (config = {}, cbs = {}) {
    const {
        projectName, version, srcArray, srcBase, dist, type, fileRegExp, packageModules
    } = config;
    const {
        start = function () { },
        log = function () { },
        end = function () { }
    } = cbs;

    const date = new Date();

    start();

    const year = date.getFullYear();
    let month = date.getMonth() + 1,
        day = date.getDate();

    month = month > 9 ? month : `0${month}`;
    day = day > 9 ? day : `0${day}`;

    const time = `${year}${month}${day}`;

    // 非模块化打包
    if (srcArray.length === 0) {
        let name = fileRegExp.replace(/\[name\]/g, projectName)
            .replace(/\[version\]/g, version).replace(/\[time\]/g, time);
        name = `${name}.${type}`;
        gulp.src(`${srcBase}\\**\\*`)
            .pipe(plumber((err) => {
                log(err);
            }))
            .pipe(zip(name))
            .pipe(gulp.dest(dist))
            .on('end', () => {
                end();
            });
    } else {
        //  用于记录是不是最后一个打包已经完成
        let packNo = 0;
        // 模块化打包
        for (let i = 0; i < srcArray.length; i++) {
            let name = fileRegExp.replace(/\[name\]/g, projectName).replace(/\[moduleName\]/g, packageModules[i])
                .replace(/\[version\]/g, version).replace(/\[time\]/g, time);
            name = `${name}.${type}`;

            if (packageModules[i] === 'common' && isDirExist(`${srcBase}/oasisl`) && readFistLevelFolder(`${srcBase}/oasisl`).length !== 0) {
                srcArray[i].push(`${srcBase}/oasisl/**/*.*`);
            }

            gulp.src(srcArray[i], { base: srcBase })
                .pipe(plumber((err) => {
                    log(err);
                }))
                .pipe(zip(name))
                .pipe(gulp.dest(dist))
                .on('end', () => {
                    if (packNo++ === (srcArray.length - 1)) {
                        end();
                    }
                });
        }
    }
};
