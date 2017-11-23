const gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourceMap = require('gulp-sourcemaps'),
    compass = require('gulp-compass'),
    minifyCss = require('gulp-clean-css'),
    reload = require('./util').reload;

module.exports = function(compileSassObj,cb){
    var stream = gulp.src(compileSassObj.src)

    if(compileSassObj.compassSetting){ //compass编译
        stream = stream.pipe(compass({
            css: compileSassObj.dest,
            sass: compileSassObj.srcBase,
            image: compileSassObj.compassSetting.imageDest,
            font:  compileSassObj.compassSetting.fontSrc,
            style: compileSassObj.isCompress ? 'compressed' : 'compact',
            sourcemap: compileSassObj.isOpenSourceMap ? true : false
        }))
    }else{ // 非compass
        // 是否开启sourceMap
        if(compileSassObj.isOpenSourceMap){
            stream = stream.pipe(sourceMap.init({loadMaps:true}))
        }
        
        stream = stream.pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())

        // 设置是否压缩
        if(compileSassObj.isCompress){
            stream = stream.pipe(minifyCss({
                compativility: 'ie8',
                level: 2
            }))
        }

        // 设置sourceMaps生成路径
        if(compileSassObj.isOpenSourceMap){
            stream = stream.pipe(sourceMap.write('./maps'))
        }
    }
        stream = stream.pipe(gulp.dest(compileSassObj.dest))
        .on('end',function(){
            console.log( compileSassObj.logInfo || `编译成功`);
            cb ? cb() : undefined;
            reload ? reload() : undefined;
        });
}
// module.exports = function(compileSassObj,cb){
//     var stream = gulp.src(compileSassObj.src);

//     // 是否开启sourceMap
//     if(compileSassObj.isOpenSourceMap){
//         stream = stream.pipe(sourceMap.init({loadMaps:true}))
//     }
    
//     stream = stream.pipe(plumber())
//     .pipe(sass())
//     .pipe(autoprefixer())

//     // 设置是否压缩
//     if(compileSassObj.isCompress){
//         stream = stream.pipe(minifyCss({
//             compativility: 'ie8',
//             level: 2
//         }))
//     }

//     // 设置sourceMaps生成路径
//     if(compileSassObj.isOpenSourceMap){
//         stream = stream.pipe(sourceMap.write('./maps'))
//     }

//     stream = stream.pipe(gulp.dest(compileSassObj.dest))
//     .on('end',function(){
//         console.log( compileSassObj.logInfo || `编译成功`);
//         cb ? cb(): undefined;
//     });
// }