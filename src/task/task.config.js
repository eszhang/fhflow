
var obj = {
    htmlObj: {
        src: ['oasisl/view/*.*'],
        dest: 'build',
        logInfo: 'html编译成功'
    },
    compileSassObj: {
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
    },
    cleanObj: {
        src: ['build'],
        logInfo: '删除成功'
    },
    jsObj: {
        src: ['oasisl/js/**/*.js'],
        dest: 'build/assets/js',
        isDelRap: true,
        isMinify: true,
        logInfo: '编译js成功'
    },
    tplObj: {
        src: 'oasisl/tpl/**/*.tpl',
        basePath: 'oasisl/tpl',
        dest: 'build/assets/template',
        helperJs: 'oasisl/js/template/helper.js',
        logInfo: 'tpl编译成功'
    },
    imgObj: {
        src: ['oasisl/images/**/*.*'],
        dest: 'build/assets/images',
        logInfo: '图片处理成功'
    },
    fontObj: {
        src: ['oasisl/fonts/**/*.*'],
        dest: 'build/assets/fonts',
        logInfo: '字体处理成功'
    },
    startServerObj: {
        baseDir: 'build',
        startPath: '/index.html',
        port: 8089,
        logInfo: '服务打开成功'
    },
    watchObj: {
        baseSrc: 'oasisl',
        watchPath: ['oasisl/**/*.*']
    }
}

module.exports = obj;








