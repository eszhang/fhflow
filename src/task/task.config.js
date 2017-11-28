
// 项目名（有时候不需要）
var projectName = 'hero';
//  模块名
var packageModule = 'backflow';
var addModulePath = ( projectName ? ( '/' + projectName) : '' ) + ( packageModule ? ( '/' + packageModule) : '' );

var devObj = {
    htmlObj: {
        src: ['oasisl/view' + addModulePath +'/**/*.html'],
        dest: 'build' + addModulePath,
        logInfo: 'html编译成功'
    },
    compileSassObj: {
        src: 'oasisl/scss' + addModulePath +'/**/*.scss',
        srcBase: 'oasisl/scss' + addModulePath ,
        dest: 'build/assets/css' + addModulePath ,
        isOpenSourceMap: true,
        isCompress: false,
        compassSetting: {
            imageDest: 'build/assets/images' + addModulePath ,
            fontSrc: 'src/fonts',
        },
        logInfo: '编译sass成功'
    },
    cleanObj: {
        src: ['build'],
        logInfo: '删除成功'
    },
    jsObj: {
        src: ['oasisl/js' + addModulePath +'/**/*.js'],
        dest: 'build/assets/js' + addModulePath,
        isDelRap: false,
        isMinify: false,
        logInfo: '编译js成功'
    },
    tplObj: {
        src: 'oasisl/tpl' + addModulePath +'/**/*.tpl',
        basePath: 'oasisl/tpl' + addModulePath,
        dest: 'build/assets/template' + addModulePath,
        helperJs: 'oasisl/js/template/helper.js',
        logInfo: 'tpl编译成功'
    },
    imgObj: {
        src: ['oasisl/images' + addModulePath +'/**/*.*'],
        dest: 'build/assets/images' + addModulePath,
        logInfo: '图片处理成功'
    },
    fontObj: {
        src: ['oasisl/fonts' + addModulePath + '/**/*.*'],
        dest: 'build/assets/fonts' + addModulePath,
        logInfo: '字体处理成功'
    },
    startServerObj: {
        baseDir: 'build',
        startPath: addModulePath + '/index.html',
        port: 8089,
        logInfo: '服务打开成功'
    },
    watchObj: {
        baseSrc: 'oasisl',
        watchPath: ['oasisl/**/*.*']
    },
    zipObj:{
        projectName: 'fh',
        version: '2.0'
    }
}

var distObj = {
    htmlObj: {
        src: ['oasisl/view' + addModulePath +'/**/*.*'],
        dest: 'build' + addModulePath,
        logInfo: 'html编译成功'
    },
    compileSassObj: {
        src: 'oasisl/scss' + addModulePath +'/**/*.scss',
        srcBase: 'oasisl/scss' + addModulePath ,
        dest: 'build/assets/css' + addModulePath ,
        isOpenSourceMap: true,
        isCompress: false,
        compassSetting: {
            imageDest: 'build/assets/images' + addModulePath ,
            fontSrc: 'src/fonts',
        },
        logInfo: '编译sass成功'
    },
    cleanObj: {
        src: ['build'],
        logInfo: '删除成功'
    },
    jsObj: {
        src: ['oasisl/js' + addModulePath +'/**/*.js'],
        dest: 'build/assets/js' + addModulePath,
        isDelRap: false,
        isMinify: false,
        logInfo: '编译js成功'
    },
    tplObj: {
        src: 'oasisl/tpl' + addModulePath +'/**/*.tpl',
        basePath: 'oasisl/tpl' + addModulePath,
        dest: 'build/assets/template' + addModulePath,
        helperJs: 'oasisl/js/template/helper.js',
        logInfo: 'tpl编译成功'
    },
    imgObj: {
        src: ['oasisl/images' + addModulePath +'/**/*.*'],
        dest: 'build/assets/images' + addModulePath,
        logInfo: '图片处理成功'
    },
    fontObj: {
        src: ['oasisl/fonts' + addModulePath + '/**/*.*'],
        dest: 'build/assets/fonts' + addModulePath,
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
    },
    zipObj:{
        src: ['release/**/*.*'],
        projectName: 'fh',
        version: '2.0',
        logInfo: 'zip打包完成'
    },
    sshObj: {
        srcBase: 'build',
        destBase: 'release',
        sftOpt: {
            host: '172.16.113.125',
            port: 22,
            user: 'root',
            pass: 'hero@125',
            remotePath: '/home/godway/web/frontend'
        }

    }
}



module.exports = {devObj,distObj};








