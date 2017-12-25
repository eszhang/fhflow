
/**
 * sass 操作
 */

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const sourceMap = require('gulp-sourcemaps');
const compass = require('gulp-compass');
const minifyCss = require('gulp-clean-css');
const utils = require('../util/index');

module.exports = function (config = {}, startCb, endCb) {

    const { src, srcBase, dest, destBase, compassSetting, isCompress, isOpenSourceMap } = config;

    startCb && startCb();
     //  用于多模块情况下记录是不是最后sass编译完成
    var sassNo = 0;
    // 非模块化的情况 
    if(Object.prototype.toString.call(srcBase) === "[object String]"){
        let stream = gulp.src(src)
        .pipe(compass({
            css: destBase,
            sass: srcBase,
            image: compassSetting.imageDest,
            font: compassSetting.fontSrc,
            style: isCompress ? 'compressed' : 'compact',
            sourcemap: isOpenSourceMap ? true : false
        }))

        stream.pipe(gulp.dest(dest))
        .on('end', function () {
            endCb && endCb();
        });

        return stream;
    }else{// 模块化的情况
        for(let i = 0 ; i < src.length; i++){
            if(utils.isDirExist(srcBase[i])){
                gulp.src(src[i])
                    .pipe(compass({
                        css: destBase[i],
                        sass: srcBase[i],
                        image: compassSetting.imageDest,
                        font: compassSetting.fontSrc,
                        style: isCompress ? 'compressed' : 'compact',
                        sourcemap: isOpenSourceMap ? true : false
                    }))
                    .pipe(gulp.dest(destBase[i]))
                    .on('end', function () {
                        sassNo++ == (src.length-1) ? endCb && endCb() : undefined
                    })
            }else{// 容错,当有的文件夹sass中不存在
                sassNo++ == (src.length - 1) ? endCb && endCb() : undefined
            }
        }

    }    
}
