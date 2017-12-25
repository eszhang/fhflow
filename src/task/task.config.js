
/**
 * 
 * @param {any} projectPath 
 * @param {any} packageModules 
 * @param {any} setting 配置文件的内容
 * @returns 
 */
function getDevObj(config){

    var { path, packageModules, setting } = config;
    var projectPath = path + '\\';

        // 此处项目名为模块化中项目业务名称.如fk
    var buinessName = setting.businessName,
        tempArray = path.split('\\'),
        projectName = tempArray[tempArray.length-1],
        dev = {},
        cleanSrcArray = [],
        htmlSrcArray = [],
        sassSrcArray = [],
        sassSrcBaseArray = [],
        sassDestArray = [],
        cssArray = [],
        jsSrcArray = [],
        tplSrcArray = [],
        imageSrcArray = [],
        fontSrcArray = [],
        othersSrcArray = [];

    // 获取模块化后的源目录
    for( var i = 0 ; i < packageModules.length ; i++ ){
        var modulePathAdd = ( buinessName ? ( '/' + buinessName) : '' ) + ( packageModules[i] ? ( '/' + packageModules[i]) : '' );
        cleanSrcArray.push(projectPath + 'build/assets/*' + modulePathAdd);
        cleanSrcArray.push(projectPath + 'build/' + modulePathAdd);
        htmlSrcArray.push(projectPath + 'src/view' + modulePathAdd +'/**/*.html');
        sassSrcArray.push(projectPath + 'src/scss' + modulePathAdd +'/**/*.scss');
        sassSrcBaseArray.push(projectPath + 'src/scss' + modulePathAdd);
        sassDestArray.push(projectPath + 'build/assets/css' + modulePathAdd);
        // css
        cssArray.push(projectPath + 'src/scss' + modulePathAdd +'/**/*.css');
        jsSrcArray.push(projectPath + 'src/js' + modulePathAdd +'/**/*.js');
        tplSrcArray.push(projectPath + 'src/tpl' + modulePathAdd +'/**/*.tpl');
        imageSrcArray.push(projectPath + 'src/images' + modulePathAdd +'/**/*.*');
        fontSrcArray.push(projectPath + 'src/fonts' + modulePathAdd +'/**/*.*');

        // othersSrcArray.push([projectPath + 'src/**/*',
        // '!'+projectPath + 'src/view', '!'+projectPath + 'src/view/**',
        // '!'+projectPath + 'src/scss', '!'+projectPath + 'src/scss/**',
        // '!'+projectPath + 'src/js', '!'+projectPath + 'src/js/**',
        // '!'+projectPath + 'src/tpl', '!'+projectPath + 'src/tpl/**',
        // '!'+projectPath + 'src/images', '!'+projectPath + 'src/images/**',
        // '!'+projectPath + 'src/fonts', '!'+projectPath + 'src/fonts/**'
        // ])
    }


    // 非模块化情况下其它文件夹
     others = [projectPath + 'src/**/*',
        '!'+projectPath + 'src/view', '!'+projectPath + 'src/view/**',
        '!'+projectPath + 'src/scss', '!'+projectPath + 'src/scss/**',
        '!'+projectPath + 'src/js', '!'+projectPath + 'src/js/**',
        '!'+projectPath + 'src/tpl', '!'+projectPath + 'src/tpl/**',
        '!'+projectPath + 'src/images', '!'+projectPath + 'src/images/**',
        '!'+projectPath + 'src/icons', '!'+projectPath + 'src/icons/**',
        '!'+projectPath + 'src/fonts', '!'+projectPath + 'src/fonts/**'
        ]

    var dev = {
        clean: {
            src: cleanSrcArray.length > 0 ? cleanSrcArray : projectPath + 'build',
            startLog: '删除开始...',
            endLog: '删除成功...'
        },
        html: {
            src: htmlSrcArray.length > 0 ? htmlSrcArray : projectPath + 'src/view/**/*.html',
            srcBase: projectPath + 'src/view',
            dest: projectPath + 'build',
            startLog: '编译html开始...',
            endLog: '编译html成功...'
        },
        sass: {
            src: sassSrcArray.length > 0 ? sassSrcArray : [projectPath + 'src/scss/**/*.scss', projectPath + 'src/scss/**/*.css'],
            srcBase: sassSrcBaseArray.length > 0 ? sassSrcBaseArray : projectPath + 'src/scss' ,
            destBase: sassDestArray.length > 0 ? sassDestArray : projectPath + 'build/assets/css',
            dest: projectPath + 'build/assets/css',
            isOpenSourceMap: true,
            isCompress: false,
            compassSetting: {
                imageDest: projectPath + 'build/assets/images' ,
                fontSrc: projectPath + 'src/fonts',
            },
            startLog: '编译sass开始...',
            endLog: '编译sass成功...'
        },
        css: {
            src: cssArray.length > 0 ? cssArray : projectPath + 'src/scss/**/*.css',
            srcBase: projectPath + 'src/scss' ,
            dest: projectPath + 'build/assets/css',
            startLog: '编译css开始...',
            endLog: '编译css成功...'
        },
        js: {
            src: jsSrcArray.length > 0 ? jsSrcArray : projectPath + 'src/js/**/*.js',
            srcBase: projectPath + 'src/js' ,
            dest: projectPath + 'build/assets/js',
            isDelRap: false,
            isMinify: false,
            startLog: '编译javascript开始...',
            endLog: '编译javascript成功...'
        },
        tpl: {
            src: tplSrcArray.length > 0 ? tplSrcArray : projectPath + 'src/tpl/**/*.tpl',
            // basePath: 'src/tpl' + addModulePath,
            srcBase: projectPath + 'src/tpl',
            dest: projectPath + 'build/assets/template',
            helperJs: projectPath + 'src/js/template/helper.js',
            startLog: '编译template开始...',
            endLog: '编译template成功...'
        },
        img: {
            src: imageSrcArray.length > 0 ? imageSrcArray : projectPath + 'src/images/**/*.*',
            srcBase: projectPath + 'src/images',
            dest: projectPath + 'build/assets/images',
            startLog: '编译images开始...',
            endLog: '编译iamges成功...'
        },
        font: {
            src: fontSrcArray.length > 0 ? fontSrcArray : projectPath + 'src/fonts/**/*.*',
            srcBase: projectPath + 'src/fonts',
            dest: projectPath + 'build/assets/fonts',
            startLog: '编译font开始...',
            endLog: '编译font成功...'
        },
        oasisl: {
            src: projectPath + 'oasisl',
            srcBase: projectPath,
            dest: projectPath + 'build',
            startLog: '拷贝oasisl开始...',
            endLog: '拷贝oasisl成功...'
        },
        others: {
            src: others,
            srcBase: projectPath + 'src',
            dest: projectPath + 'build/assets',
            startLog: '拷贝其它文件开始...',
            endLog: '拷贝其它文件成功...'
        },
        iconfont: {
            svgSrc:  [projectPath + 'src/icons/assets/*.svg'],
            fontName: projectName+'-icon',
            cssSrc: projectPath+'src/icons/templates/'+projectName+'icon.css',
            fontPath: '../fonts',
            className: projectName+'icon',
            version: '1.0.0',
            cssDest: projectPath+'build/assets/css/',
            fontsDest: projectPath+'build/assets/fonts/',
            startLog: '编译iconfont开始...',
            endLog: '编译iconfont成功...'
        },
        startServer: {
            srcBase: projectPath + 'build',
            startPath: '',
            port: setting.server.port,
            proxys: setting.server.proxys,
            path: path,
            endLog: '启动server成功...'
        },
        watch: {
            srcBase: 'src',
            watchPath: [projectPath + 'src/**/*.*'],
            endLog: '启动watch成功...'
        }
    }

    if(setting.supportREM){
        dev['compileAutoprefixer'] = {
            src: projectPath + 'build/assets/css/**/*.css',
            dest: projectPath + 'build/assets/css',
            startLog: '添加rem开始...',
            endLog: '添加rem成功...'
        }
    }

    if(setting.reversion){
        dev['reversion'] = {
            src: projectPath + 'build/**/*.*',
            dest: projectPath + 'build',
            startLog: 'reversion开始...',
            endLog: 'reversion成功...'
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
    var projectPath = path + '\\';

    var tempArray = path.split('\\');
    var projectName = tempArray[tempArray.length-1]

        // 此处项目名为模块化中项目业务名称.如fk
    var buinessName = setting.businessName,
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
        var modulePathAdd = ( buinessName ? ( '/' + buinessName) : '' ) + ( packageModules[i] ? ( '/' + packageModules[i]) : '' );
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
        var modulePathAdd = ( buinessName ? ( '/' + buinessName) : '' ) + ( packageModules[i] ? ( '/' + packageModules[i]) : '' );
        src.push(projectPath + 'build'+ modulePathAdd + '/**/*.*');
        src.push(projectPath + 'build/assets/css'+ modulePathAdd + '/**/*.*');
        src.push(projectPath + 'build/assets/fonts'+ modulePathAdd + '/**/*.*');
        src.push(projectPath + 'build/assets/images'+ modulePathAdd + '/**/*.*');
        src.push(projectPath + 'build/assets/js'+ modulePathAdd + '/**/*.*');
        src.push(projectPath + 'build/assets/template'+ modulePathAdd + '/**/*.*');
        packSrcArray.push(src);
    }

    var packObj = {
        clean: {
            src: cleanSrcArray.length > 0 ? cleanSrcArray : projectPath + 'build',
            startLog: '删除开始...',
            endLog: '删除成功...'
        },
        html: {
            src: htmlSrcArray.length > 0 ? htmlSrcArray : projectPath + 'src/view/**/*.html',
            srcBase: projectPath + 'src/view',
            dest: projectPath + 'build',
            startLog: '编译html开始...',
            endLog: '编译html成功...',
            updateLog: '更新html成功...'
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
            startLog: '编译sass开始...',
            endLog: '编译sass成功...',
            updateLog: '更新sass成功...'
        },
        js: {
            src: jsSrcArray.length > 0 ? jsSrcArray : projectPath + 'src/js/**/*.js',
            srcBase: projectPath + 'src/js' ,
            dest: projectPath + 'build/assets/js',
            isDelRap: true,
            isMinify: true,
            startLog: '编译javascript开始...',
            endLog: '编译avascript成功...',
            updateLog: '更新javascript成功...'
        },
        tpl: {
            src: tplSrcArray.length > 0 ? tplSrcArray : projectPath + 'src/tpl/**/*.tpl',
            srcBase: projectPath + 'src/tpl',
            dest: projectPath + 'build/assets/template',
            helperJs: projectPath + 'src/js/template/helper.js',
            startLog: '编译template开始...',
            endLog: '编译template成功...',
            updateLog: '更新template成功...'
        },
        img: {
            src: imageSrcArray.length > 0 ? imageSrcArray : projectPath + 'src/images/**/*.*',
            srcBase: projectPath + 'src/images',
            dest: projectPath + 'build/assets/images',
            startLog: '编译images开始...',
            endLog: '编译iamges成功...',
            updateLog: '更新images成功...'
        },
        font: {
            src: fontSrcArray.length > 0 ? fontSrcArray : projectPath + 'src/fonts/**/*.*',
            srcBase: projectPath + 'src/fonts',
            dest: projectPath + 'build/assets/fonts',
            startLog: '编译font开始...',
            endLog: '编译font成功...',
            updateLog: '更新font成功...'
        },
        iconfont: {
            svgSrc:  [projectPath + 'src/icons/assets/*.svg'],
            fontName: projectName+'-icon',
            cssSrc: projectName+'src/icons/templates/'+projectName+'icon.css',
            fontPath: '../fonts',
            className: projectName+'icon',
            version: '1.0.0',
            cssDest: 'build/assets/css/',
            fontsDest: 'build/assets/fonts/',
            startLog: '编译iconfont开始...',
            endLog: '编译iconfont成功...'
        },
        zip:{
            srcArray: packSrcArray,
            srcBase: projectPath + 'build',
            dist: projectPath,
            projectName: projectName,
            packageModules: packageModules,
            type: setting.package.type,
            version: setting.package.version,
            fileRegExp: setting.package.fileRegExp,
            endLog: '打包pack成功...'
        }
    }

    if(setting.supportREM){
        packObj['compileAutoprefixer'] = {
            src: projectPath + 'build/assets/css/**/*.css',
            dest: projectPath + 'build/assets/css',
            startLog: '添加rem开始...',
            endLog: '添加rem成功...'
        }
    }

    if(setting.reversion){
        packObj['reversion'] = {
            src: projectPath + 'build/**/*.*',
            dest: projectPath + 'build',
            startLog: 'reversion开始...',
            endLog: 'reversion成功...'
        }
    }
    return packObj;
}

function getUploadObj( config ){

    let {path,setting} = config;
    let projectPath = path + '/';
    let ssh = {
        srcBase: projectPath + 'build',
        destBase: projectPath + 'release',
        ignoreFileRegExp: setting.ftp.ignoreFileRegExp,
        sft: {
            host: setting.ftp.host,
            port: setting.ftp.port,
            user: setting.ftp.user,
            pass: setting.ftp.pass,
            remotePath: setting.ftp.remotePath
        },
        startLog: '上传files开始...',
        endLog: '上传files成功...'
    }
    return ssh;
}

module.exports = {getDevObj,getPackObj, getUploadObj};








