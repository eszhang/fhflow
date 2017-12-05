
/**
 * 
 * @param {any} projectPath 
 * @param {any} packageModule 
 * @param {any} projectName  此处项目名为模块化中项目名称(业务名称)
 * @returns 
 */
function getDevObj(projectPath,packageModule,projectName){
    var addModulePath = ( projectName ? ( '/' + projectName) : '' ) + ( packageModule ? ( '/' + packageModule) : '' );
    projectPath = projectPath + '/';
    var devObj = {
        htmlObj: {
            src: [projectPath + 'src/view' + addModulePath +'/**/*.html'],
            baseSrc: projectPath + 'src/view',
            dest: projectPath + 'build'
        },
        compileSassObj: {
            src: projectPath + 'src/scss' + addModulePath +'/**/*.scss',
            srcBase: projectPath + 'src/scss' + addModulePath ,
            dest: projectPath + 'build/assets/css' + addModulePath ,
            isOpenSourceMap: true,
            isCompress: false,
            compassSetting: {
                imageDest: projectPath + 'build/assets/images' + addModulePath ,
                fontSrc: projectPath + 'src/fonts',
            },
            logInfo: '编译sass成功'
        },
        cleanObj: {
            src: [projectPath + 'build'],
            logInfo: '删除成功'
        },
        jsObj: {
            src: [projectPath + 'src/js' + addModulePath +'/**/*.js'],
            dest: projectPath + 'build/assets/js' + addModulePath,
            isDelRap: false,
            isMinify: false,
            logInfo: '编译js成功'
        },
        tplObj: {
            src: projectPath + 'src/tpl' + addModulePath +'/**/*.tpl',
            basePath: 'src/tpl' + addModulePath,
            dest: projectPath + 'build/assets/template' + addModulePath,
            helperJs: projectPath + 'src/js/template/helper.js',
            logInfo: 'tpl编译成功'
        },
        imgObj: {
            src: [projectPath + 'src/images' + addModulePath +'/**/*.*'],
            dest: projectPath + 'build/assets/images' + addModulePath,
            logInfo: '图片处理成功'
        },
        fontObj: {
            src: [projectPath + 'src/fonts' + addModulePath + '/**/*.*'],
            dest: projectPath + 'build/assets/fonts' + addModulePath,
            logInfo: '字体处理成功'
        },
        startServerObj: {
            baseDir: projectPath + 'build',
            startPath: addModulePath + '/index.html',
            port: 8089,
            logInfo: '服务打开成功'
        },
        watchObj: {
            baseSrc: projectPath + 'src',
            watchPath: [projectPath + 'src/**/*.*']
        },
        zipObj:{
            projectName: projectName,
            version: '2.0'
        }
    }
    return devObj;
}

/**
 * 
 * @param {any} projectPath 
 * @param {any} packageModule 
 * @param {any} projectName  此处项目名为模块化中项目名称
 * @returns 
 */
function getDistObj(projectPath,packageModule,projectName){
    var addModulePath = ( projectName ? ( '/' + projectName) : '' ) + ( packageModule ? ( '/' + packageModule) : '' );
    projectPath = projectPath + '/';
    var distObj = {
        htmlObj: {
            src: [projectPath + 'src/view' + addModulePath +'/**/*.*'],
            dest: projectPath + 'build' + addModulePath,
            logInfo: 'html编译成功'
        },
        compileSassObj: {
            src: projectPath + 'src/scss' + addModulePath +'/**/*.scss',
            srcBase: projectPath + 'src/scss' + addModulePath ,
            dest: projectPath + 'build/assets/css' + addModulePath ,
            isOpenSourceMap: true,
            isCompress: false,
            compassSetting: {
                imageDest: projectPath + 'build/assets/images' + addModulePath ,
                fontSrc: projectPath + 'src/fonts',
            },
            logInfo: '编译sass成功'
        },
        cleanObj: {
            src: [projectPath + 'build'],
            logInfo: '删除成功'
        },
        jsObj: {
            src: [projectPath + 'src/js' + addModulePath +'/**/*.js'],
            dest: projectPath + 'build/assets/js' + addModulePath,
            isDelRap: false,
            isMinify: false,
            logInfo: '编译js成功'
        },
        tplObj: {
            src: projectPath + 'src/tpl' + addModulePath +'/**/*.tpl',
            basePath: 'src/tpl' + addModulePath,
            dest: projectPath + 'build/assets/template' + addModulePath,
            helperJs: projectPath + 'src/js/template/helper.js',
            logInfo: 'tpl编译成功'
        },
        imgObj: {
            src: [projectPath + 'src/images' + addModulePath +'/**/*.*'],
            dest: projectPath + 'build/assets/images' + addModulePath,
            logInfo: '图片处理成功'
        },
        fontObj: {
            src: [projectPath + 'src/fonts' + addModulePath + '/**/*.*'],
            dest: projectPath + 'build/assets/fonts' + addModulePath,
            logInfo: '字体处理成功'
        },
        startServerObj: {
            baseDir: projectPath + 'build',
            startPath: addModulePath + '/index.html',
            port: 8089,
            logInfo: '服务打开成功'
        },
        watchObj: {
            baseSrc: projectPath + 'src',
            watchPath: [projectPath + 'src/**/*.*']
        },
        zipObj:{
            src: [projectPath + 'release/**/*.*'],
            projectName: 'fh',
            version: '2.0',
            logInfo: 'zip打包完成'
        },
        sshObj: {
            srcBase: projectPath + 'build',
            destBase: projectPath + 'release',
            sftOpt: {
                host: '172.16.113.125',
                port: 22,
                user: 'root',
                pass: 'hero@125',
                remotePath: '/home/godway/web/frontend'
            }

        }
    }
    return distObj;
}



module.exports = {getDevObj,getDistObj};








