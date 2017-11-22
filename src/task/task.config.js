
const CompileHtml = require('./common/html'),
      CompileSass = require('./common/compileSass'),
      Clean = require('./common/clean'),
      CompileJavaSript = require('./common/javascript'),
      CompileImage = require('./common/image'),
      async = require('async');

var htmlObj = {
    src: ['oasisl/view/*.*'],
    dest: 'build',
    logInfo: 'html编译成功'
}

var compileSassObj = {
    src: 'oasisl/scss/**/*.scss',
    srcBase: 'oasisl/scss',
    dest: 'build/assets/css',
    isOpenSourceMap: true,
    isCompress: true,
    compassSetting: {
        imageDest: 'build/assets/images',
        fontSrc: 'src/fonts',
    },
    logInfo: '编译sass成功'
}

var cleanObj = {
    src: ['build'],
    logInfo: '删除成功'
}

var jsObj = {
    src: ['oasisl/js/**/*.js'],
    dest: 'build/assets/js',
    isDelRap: true,
    isMinify: true,
    logInfo: '编译js成功'
}

var imgObj = {
    src: ['oasisl/images/**/*.png'],
    dest: 'build/assets/image',
    logInfo: '图片处理成功'
}



async.series([
    /**
     *  先删除
     */
    function(next){
        Clean(cleanObj,next);
    },
    function(next){
        /**
         * 进行一些同步操作
         */
        async.parallel([
            function (cb) {
                CompileHtml(htmlObj,cb);
            },
            function (cb){
                CompileSass(compileSassObj,cb);
            },
            function (cb){
                CompileJavaSript(jsObj,cb);
            },
            function (cb){
                CompileImage(imgObj,cb);
            }
        ],function(error){
            if(error){
                throw new Error(error);
            }
            next();
        })
    }
])



