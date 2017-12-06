
/**
 * 
 * @param {any} projectPath 
 * @param {any} packageModules 
 * @param {any} setting 配置文件的内容
 * @returns 
 */
function getDevObj(config){

    var { path, packageModules, setting } = config;
    var projectPath = path + '/';

        // 此处项目名为模块化中项目业务名称.如fk
    var projectName = setting.businessName,
        dev = {},
        cleanSrcArray = [],
        htmlSrcArray = [],
        sassSrcArray = [],
        jsSrcArray = [],
        tplSrcArray = [],
        imageSrcArray = [],
        fontSrcArray = [];

    // 获取模块化后的源目录
    for( var i = 0 ; i < packageModules.length ; i++ ){
        var modulePathAdd = ( projectName ? ( '/' + projectName) : '' ) + ( packageModules[i] ? ( '/' + packageModules[i]) : '' );
        cleanSrcArray.push(projectPath + 'build/assets/*' + modulePathAdd);
        cleanSrcArray.push(projectPath + 'build/' + modulePathAdd);
        htmlSrcArray.push(projectPath + 'src/view' + modulePathAdd +'/**/*.html');
        sassSrcArray.push(projectPath + 'src/scss' + modulePathAdd +'/**/*.scss');
        jsSrcArray.push(projectPath + 'src/js' + modulePathAdd +'/**/*.js');
        tplSrcArray.push(projectPath + 'src/tpl' + modulePathAdd +'/**/*.tpl');
        imageSrcArray.push(projectPath + 'src/images' + modulePathAdd +'/**/*.*');
        fontSrcArray.push(projectPath + 'src/fonts' + modulePathAdd +'/**/*.*');
    }

    var dev = {
        clean: {
            src: cleanSrcArray.length > 0 ? cleanSrcArray : projectPath + 'build',
            logInfo: '删除成功'
        },
        html: {
            src: htmlSrcArray.length > 0 ? htmlSrcArray : projectPath + 'src/view/**/*.html',
            srcBase: projectPath + 'src/view',
            dest: projectPath + 'build',
            logInfo: '编译html成功'
        },
        sass: {
            src: sassSrcArray.length > 0 ? sassSrcArray : projectPath + 'src/scss/**/*.scss',
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
        js: {
            src: jsSrcArray.length > 0 ? jsSrcArray : projectPath + 'src/js/**/*.js',
            srcBase: projectPath + 'src/js' ,
            dest: projectPath + 'build/assets/js',
            isDelRap: false,
            isMinify: false,
            logInfo: '编译js成功'
        },
        tpl: {
            src: tplSrcArray.length > 0 ? tplSrcArray : projectPath + 'src/tpl/**/*.tpl',
            // basePath: 'src/tpl' + addModulePath,
            srcBase: projectPath + 'src/tpl',
            dest: projectPath + 'build/assets/template',
            helperJs: projectPath + 'src/js/template/helper.js',
            logInfo: 'tpl编译成功'
        },
        img: {
            src: imageSrcArray.length > 0 ? imageSrcArray : projectPath + 'src/images/**/*.*',
            srcBase: projectPath + 'src/images',
            dest: projectPath + 'build/assets/images',
            logInfo: '图片处理成功'
        },
        font: {
            src: fontSrcArray.length > 0 ? fontSrcArray : projectPath + 'src/fonts/**/*.*',
            srcBase: projectPath + 'src/fonts',
            dest: projectPath + 'build/assets/fonts',
            logInfo: '字体处理成功'
        },
        startServer: {
            srcBase: projectPath + 'build',
            startPath: '',
            port: 8089,
            logInfo: '服务打开成功',
            proxy: setting.server.proxy
        },
        watch: {
            srcBase: 'src',
            watchPath: [projectPath + 'src/**/*.*']
        }
    }
    return dev;
}

/**
 * 
 * @param {any} projectPath 
 * @param {any} packageModules 
 * @param {any} setting 配置文件的内容
 * @returns 
 */
function getPackObj(config){
    var { path, packageModules, setting } = config;
    var projectPath = path + '/';

        // 此处项目名为模块化中项目业务名称.如fk
    var projectName = setting.businessName,
        dev = {},
        cleanSrcArray = [],
        htmlSrcArray = [],
        sassSrcArray = [],
        jsSrcArray = [],
        tplSrcArray = [],
        imageSrcArray = [],
        fontSrcArray = [];

    // 获取模块化后的源目录
    for( var i = 0 ; i < packageModules.length ; i++ ){
        var modulePathAdd = ( projectName ? ( '/' + projectName) : '' ) + ( packageModules[i] ? ( '/' + packageModules[i]) : '' );
        cleanSrcArray.push(projectPath + 'build/assets/*' + modulePathAdd);
        cleanSrcArray.push(projectPath + 'build' + modulePathAdd);
        htmlSrcArray.push(projectPath + 'src/view' + modulePathAdd +'/**/*.html');
        sassSrcArray.push(projectPath + 'src/scss' + modulePathAdd +'/**/*.scss');
        jsSrcArray.push(projectPath + 'src/js' + modulePathAdd +'/**/*.js');
        tplSrcArray.push(projectPath + 'src/tpl' + modulePathAdd +'/**/*.tpl');
        imageSrcArray.push(projectPath + 'src/images' + modulePathAdd +'/**/*.*');
        fontSrcArray.push(projectPath + 'src/fonts' + modulePathAdd +'/**/*.*');
    }

    // 存放多模块的打包路径
    var packSrcArray = [];
    for( var i = 0 ; i < packageModules.length ; i++ ){
        var src = [];
        var modulePathAdd = ( projectName ? ( '/' + projectName) : '' ) + ( packageModules[i] ? ( '/' + packageModules[i]) : '' );
        src.push(projectPath + 'build'+ modulePathAdd + '/**/*.*');
        src.push(projectPath + 'build/assets/css'+ modulePathAdd + '/**/*.*');
        src.push(projectPath + 'build/assets/fonts'+ modulePathAdd + '/**/*.*');
        src.push(projectPath + 'build/assets/images'+ modulePathAdd + '/**/*.*');
        src.push(projectPath + 'build/assets/js'+ modulePathAdd + '/**/*.*');
        src.push(projectPath + 'build/assets/template'+ modulePathAdd + '/**/*.*');
        packSrcArray.push(src);
    }

    var distObj = {
        clean: {
            src: cleanSrcArray.length > 0 ? cleanSrcArray : projectPath + 'build',
            logInfo: '删除成功'
        },
        html: {
            src: htmlSrcArray.length > 0 ? htmlSrcArray : projectPath + 'src/view/**/*.html',
            srcBase: projectPath + 'src/view',
            dest: projectPath + 'build',
            logInfo: '编译html成功'
        },
        sass: {
            src: sassSrcArray.length > 0 ? sassSrcArray : projectPath + 'src/scss/**/*.scss',
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
        js: {
            src: jsSrcArray.length > 0 ? jsSrcArray : projectPath + 'src/js/**/*.js',
            srcBase: projectPath + 'src/js' ,
            dest: projectPath + 'build/assets/js',
            isDelRap: true,
            isMinify: true,
            logInfo: '编译js成功'
        },
        tpl: {
            src: tplSrcArray.length > 0 ? tplSrcArray : projectPath + 'src/tpl/**/*.tpl',
            srcBase: projectPath + 'src/tpl',
            dest: projectPath + 'build/assets/template',
            helperJs: projectPath + 'src/js/template/helper.js',
            logInfo: 'tpl编译成功'
        },
        img: {
            src: imageSrcArray.length > 0 ? imageSrcArray : projectPath + 'src/images/**/*.*',
            srcBase: projectPath + 'src/images',
            dest: projectPath + 'build/assets/images',
            logInfo: '图片处理成功'
        },
        font: {
            src: fontSrcArray.length > 0 ? fontSrcArray : projectPath + 'src/fonts/**/*.*',
            srcBase: projectPath + 'src/fonts',
            dest: projectPath + 'build/assets/fonts',
            logInfo: '字体处理成功'
        },
        zip:{
            srcArray: packSrcArray,
            srcBase: projectPath + 'build',
            dist: projectPath,
            projectName: 'fh',
            version: '2.0',
            logInfo: 'zip打包完成'
        }
    }
    return distObj;
}

function getUploadObj( config ){
    var sshObj = {
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
    return sshObj;
}

module.exports = {getDevObj,getPackObj, getUploadObj};








