
/**
 * 
 * @param {any} projectPath 
 * @param {any} packageModule 
 * @param {any} projectName  此处项目名为模块化中项目名称(业务名称)
 * @returns 
 */
function getDevObj(projectPath,packageModules,projectName){
    var projectPath = projectPath + '/',
        dev = {},
        cleanSrcArray = [],
        htmlSrcArray = [],
        sassSrcArray = [],
        jsSrcArray = [],
        tplSrcArray = [],
        imageSrcArray = [],
        fontSrcArray = [];
    for( var i = 0 ; i < packageModules.lenght ; i++ ){
        var modulePathAdd = ( projectName ? ( '/' + projectName) : '' ) + ( packageModule[i] ? ( '/' + packageModule[i]) : '' );

        htmlSrcArray.add(projectPath + 'build/assets/*' + modulePathAdd);
        htmlSrcArray.add(projectPath + 'build/' + modulePathAdd);
        htmlSrcArray.add(projectPath + 'src/view' + modulePathAdd +'/**/*.html');
        sassSrcArray.add(projectPath + 'src/scss' + modulePathAdd +'/**/*.scss');
        jsSrcArray.add(projectPath + 'src/js' + modulePathAdd +'/**/*.js');
        tplSrcArray.add(projectPath + 'src/tpl' + modulePathAdd +'/**/*.tpl');
        imageSrcArray.add(projectPath + 'src/images' + modulePathAdd +'/**/*.*');
        fontSrcArray.add(projectPath + 'src/fonts' + modulePathAdd +'/**/*.*');
    }





    var devObj = {
        htmlObj: {
            src: htmlSrcArray,
            srcBase: projectPath + 'src/view',
            dest: projectPath + 'build',
            logInfo: '编译html成功'
        },
         compileSassObj: {
            src: sassSrcArray,
            srcBase: projectPath + 'src/scss' ,
            dest: projectPath + 'build/assets/css',
            isOpenSourceMap: true,
            isCompress: false,
            compassSetting: {
                imageDest: projectPath + 'build/assets/images' ,
                fontSrc: projectPath + 'src/fonts',
            },
            logInfo: '编译sass成功'
        },
        cleanObj: {
            src: [projectPath + 'build'],
            logInfo: '删除成功'
        },
        jsObj: {
            src: jsSrcArray,
            srcBase: projectPath + 'src/js' ,
            dest: projectPath + 'build/assets/js',
            isDelRap: false,
            isMinify: false,
            logInfo: '编译js成功'
        },
        tplObj: {
            src: tplSrcArray,
            // basePath: 'src/tpl' + addModulePath,
            srcBase: projectPath + 'src/tpl',
            dest: projectPath + 'build/assets/template',
            helperJs: projectPath + 'src/js/template/helper.js',
            logInfo: 'tpl编译成功'
        },
        imgObj: {
            src: imageSrcArray,
            srcBase: projectPath + 'src/images',
            dest: projectPath + 'build/assets/images',
            logInfo: '图片处理成功'
        },
        fontObj: {
            src: fontSrcArray,
            srcBase: projectPath + 'src/fonts',
            dest: projectPath + 'build/assets/fonts',
            logInfo: '字体处理成功'
        },
        startServerObj: {
            srcBase: projectPath + 'build',
            startPath: '',
            port: 8089,
            logInfo: '服务打开成功'
        },
        watchObj: {
            baseSrc: projectPath + 'src',
            watchPath: [projectPath + 'src/**/*.*']
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
            src: [projectPath + 'src/scss' + addModulePath +'/**/*.scss'],
            srcBase: projectPath + 'src/scss' + addModulePath ,
            dest: projectPath + 'build/assets/css',
            isOpenSourceMap: true,
            isCompress: false,
            compassSetting: {
                imageDest: projectPath + 'build/assets/images' ,
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








