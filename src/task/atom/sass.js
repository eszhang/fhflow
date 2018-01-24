
/**
 * sass 操作
 */

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const compass = require('gulp-compass');
const _ = require('lodash');
const { isDirExist, readFistLevelFolder } = require('../utils/file');

module.exports = function (config = {}, cbs = {}) {
    const {
        src, srcBase, dest, destBase, compassSetting, isCompress, isOpenSourceMap
    } = config;
    const {
        start = function () { },
        log = function () { },
        end = function () { }
    } = cbs;

    start();
    // 非模块化的情况
    if ( _.isString(srcBase)) {
        const stream = gulp.src(src)
            .pipe(plumber((err) => {
                log(err);
            }))
            .pipe(compass({
                css: destBase,
                sass: srcBase,
                image: compassSetting.imageDest,
                font: compassSetting.fontSrc,
                style: isCompress ? 'compressed' : 'compact',
                sourcemap: !!isOpenSourceMap
            }));

        stream.pipe(gulp.dest(dest))
            .on('end', () => {
                end();
            });

        return stream;
    }else{
        //  用于多模块情况下记录是不是最后sass编译完成
        let sassNo = 0;
        // 模块化的情况
        for (let i = 0; i < src.length; i++) {
            if (isDirExist(srcBase[i]) && readFistLevelFolder(srcBase[i]).length !== 0) { // 目录存在,并且目录不为空
                gulp.src(src[i])
                    .pipe(plumber((err) => {
                        log(err);
                    }))
                    .pipe(compass({
                        css: destBase[i],
                        sass: srcBase[i],
                        image: compassSetting.imageDest,
                        font: compassSetting.fontSrc,
                        style: isCompress ? 'compressed' : 'compact',
                        sourcemap: !!isOpenSourceMap
                    }))
                    .pipe(gulp.dest(destBase[i]))
                    .on('end', () => {
                        sassNo++ === (src.length - 1) ? end() : undefined;
                    });
            } else { // 容错,当有的文件夹sass中不存在
                sassNo++ === (src.length - 1) ? end() : undefined;
            }
        }
    }

    return false;
};
