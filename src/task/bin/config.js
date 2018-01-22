const { readFistLevelFolder } = require('../utils/file');

/**
 *
 * @param {any} projectPath
 * @param {any} packageModules
 * @param {any} setting 配置文件的内容
 * @returns
 */
function getDevObj(config) {
    const { path, packageModules, setting } = config;
    const projectPath = `${path}\\`;

    // 此处项目名为模块化中项目业务名称.如fk
    const buinessName = setting.businessName,
        tempArray = path.split('\\'),
        projectName = tempArray[tempArray.length - 1],
        cleanSrcArray = [],
        htmlSrcArray = [],
        sassSrcArray = [],
        sassSrcBaseArray = [],
        sassDestArray = [],
        cssArray = [],
        jsSrcArray = [],
        tplSrcArray = [],
        imageSrcArray = [],
        fontSrcArray = [];

    let dev = null,
        others = [];

    // 获取模块化后的源目录
    for (let i = 0; i < packageModules.length; i++) {
        const modulePathAdd = (buinessName ? (`/${buinessName}`) : '') + (packageModules[i] ? (`/${packageModules[i]}`) : '');
        cleanSrcArray.push(`${projectPath}build/assets/*${modulePathAdd}`);
        cleanSrcArray.push(`${projectPath}build/${modulePathAdd}`);
        htmlSrcArray.push(`${projectPath}src/view${modulePathAdd}/**/*.html`);
        sassSrcArray.push(`${projectPath}src/scss${modulePathAdd}/**/*.scss`);
        sassSrcBaseArray.push(`${projectPath}src/scss${modulePathAdd}`);
        sassDestArray.push(`${projectPath}build/assets/css${modulePathAdd}`);
        // css
        cssArray.push(`${projectPath}src/scss${modulePathAdd}/**/*.css`);
        jsSrcArray.push(`${projectPath}src/js${modulePathAdd}/**/*.js`);
        tplSrcArray.push(`${projectPath}src/tpl${modulePathAdd}/**/*.tpl`);
        imageSrcArray.push(`${projectPath}src/images${modulePathAdd}/**/*.*`);
        fontSrcArray.push(`${projectPath}src/fonts${modulePathAdd}/**/*.*`);
    }


    // 非模块化情况下其它文件夹,直接拷贝
    others = [`${projectPath}src/**/*`,
        `!${projectPath}src/view`, `!${projectPath}src/view/**`,
        `!${projectPath}src/scss`, `!${projectPath}src/scss/**`,
        `!${projectPath}src/js`, `!${projectPath}src/js/**`,
        `!${projectPath}src/tpl`, `!${projectPath}src/tpl/**`,
        `!${projectPath}src/images`, `!${projectPath}src/images/**`,
        `!${projectPath}src/icons`, `!${projectPath}src/icons/**`,
        `!${projectPath}src/fonts`, `!${projectPath}src/fonts/**`
    ];

    dev = {
        clean: {
            src: cleanSrcArray.length > 0 ? cleanSrcArray : `${projectPath}build`
        },
        html: {
            src: htmlSrcArray.length > 0 ? htmlSrcArray : `${projectPath}src/view/**/*.html`,
            srcBase: `${projectPath}src/view`,
            dest: `${projectPath}build`
        },
        sass: {
            src: sassSrcArray.length > 0 ? sassSrcArray : [`${projectPath}src/scss/**/*.scss`, `${projectPath}src/scss/**/*.css`],
            srcBase: sassSrcBaseArray.length > 0 ? sassSrcBaseArray : `${projectPath}src/scss`,
            destBase: sassDestArray.length > 0 ? sassDestArray : `${projectPath}build/assets/css`,
            dest: `${projectPath}build/assets/css`,
            isOpenSourceMap: true,
            isCompress: false,
            compassSetting: {
                imageDest: `${projectPath}build/assets/images`,
                fontSrc: `${projectPath}src/fonts`
            }
        },
        css: {
            src: cssArray.length > 0 ? cssArray : `${projectPath}src/scss/**/*.css`,
            srcBase: `${projectPath}src/scss`,
            dest: `${projectPath}build/assets/css`
        },
        js: {
            src: jsSrcArray.length > 0 ? jsSrcArray : `${projectPath}src/js/**/*.js`,
            srcBase: `${projectPath}src/js`,
            dest: `${projectPath}build/assets/js`,
            isDelRap: false,
            isMinify: false
        },
        tpl: {
            src: tplSrcArray.length > 0 ? tplSrcArray : `${projectPath}src/tpl/**/*.tpl`,
            // basePath: 'src/tpl' + addModulePath,
            srcBase: `${projectPath}src/tpl`,
            dest: `${projectPath}build/assets/template`,
            helperJs: `${projectPath}src/js/template/helper.js`,
            startLog: '编译template开始...',
            endLog: '编译template成功...'
        },
        img: {
            src: imageSrcArray.length > 0 ? imageSrcArray : `${projectPath}src/images/**/*.*`,
            srcBase: `${projectPath}src/images`,
            dest: `${projectPath}build/assets/images`
        },
        font: {
            src: fontSrcArray.length > 0 ? fontSrcArray : `${projectPath}src/fonts/**/*.*`,
            srcBase: `${projectPath}src/fonts`,
            dest: `${projectPath}build/assets/fonts`
        },
        oasisl: {
            src: `${projectPath}oasisl`,
            srcBase: projectPath,
            dest: `${projectPath}build`
        },
        others: {
            src: others,
            srcBase: `${projectPath}src`,
            dest: `${projectPath}build/assets`
        },
        iconfont: {
            svgSrc: packageModules.length > 0 ? [`${projectPath}src/icons/${buinessName}/common/assets/*.svg`] : [`${projectPath}src/icons/assets/*.svg`],
            fontName: `${projectName}-icon`,
            cssSrc: packageModules.length > 0 ? `${projectPath}src/icons/${buinessName}/common/templates/${projectName}icon.css` : `${projectPath}src/icons/templates/${projectName}icon.css`,
            fontPath: packageModules.length > 0 ? '../../../fonts/common/' : '../fonts/',
            className: `${projectName}icon`,
            version: '1.0.0',
            cssDest: packageModules.length > 0 ? `${projectPath}build/assets/css/${buinessName}/common` : `${projectPath}build/assets/css/`,
            fontsDest: packageModules.length > 0 ? `${projectPath}build/assets/fonts/${buinessName}/common` : `${projectPath}build/assets/fonts/`
        },
        startServer: {
            srcBase: `${projectPath}build`,
            startPath: '',
            port: setting.server.port,
            proxys: setting.server.proxys,
            path
        },
        watch: {
            srcBase: 'src',
            watchPath: [`${projectPath}src/**/*.*`]
        }
    };

    if (setting.supportREM) {
        dev.compileAutoprefixer = {
            src: `${projectPath}build/assets/css/**/*.css`,
            dest: `${projectPath}build/assets/css`
        };
    }

    if (setting.reversion) {
        dev.reversion = {
            src: `${projectPath}build/**/*.*`,
            dest: `${projectPath}build`
        };
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
function getPackObj(config) {
    const { path, packageModules, setting } = config;
    const projectPath = `${path}\\`;

    const tempArray = path.split('\\');
    const projectName = tempArray[tempArray.length - 1];

    // 此处项目名为模块化中项目业务名称.如fk
    const buinessName = setting.businessName,
        cleanSrcArray = [],
        htmlSrcArray = [],
        sassSrcArray = [],
        sassSrcBaseArray = [],
        sassDestArray = [],
        cssArray = [],
        jsSrcArray = [],
        tplSrcArray = [],
        imageSrcArray = [],
        fontSrcArray = [];

    let others = [];
    // 获取模块化后的源目录
    for (let i = 0; i < packageModules.length; i++) {
        const modulePathAdd = (buinessName ? (`/${buinessName}`) : '') + (packageModules[i] ? (`/${packageModules[i]}`) : '');
        cleanSrcArray.push(`${projectPath}build/assets/*${modulePathAdd}`);
        cleanSrcArray.push(`${projectPath}build${modulePathAdd}`);
        htmlSrcArray.push(`${projectPath}src/view${modulePathAdd}/**/*.html`);
        sassSrcArray.push(`${projectPath}src/scss${modulePathAdd}/**/*.scss`);
        sassSrcBaseArray.push(`${projectPath}src/scss${modulePathAdd}`);
        sassDestArray.push(`${projectPath}build/assets/css${modulePathAdd}`);
        // css
        cssArray.push(`${projectPath}src/scss${modulePathAdd}/**/*.css`);
        jsSrcArray.push(`${projectPath}src/js${modulePathAdd}/**/*.js`);
        tplSrcArray.push(`${projectPath}src/tpl${modulePathAdd}/**/*.tpl`);
        imageSrcArray.push(`${projectPath}src/images${modulePathAdd}/**/*.*`);
        fontSrcArray.push(`${projectPath}src/fonts${modulePathAdd}/**/*.*`);
    }

    // 非模块化情况下其它文件夹,直接拷贝
    others = [`${projectPath}src/**/*`,
        `!${projectPath}src/view`, `!${projectPath}src/view/**`,
        `!${projectPath}src/scss`, `!${projectPath}src/scss/**`,
        `!${projectPath}src/js`, `!${projectPath}src/js/**`,
        `!${projectPath}src/tpl`, `!${projectPath}src/tpl/**`,
        `!${projectPath}src/images`, `!${projectPath}src/images/**`,
        `!${projectPath}src/icons`, `!${projectPath}src/icons/**`,
        `!${projectPath}src/fonts`, `!${projectPath}src/fonts/**`
    ];

    // 存放多模块的打包路径
    const packSrcArray = [];
    for (let i = 0; i < packageModules.length; i++) {
        const src = [];
        const modulePathAdd = (buinessName ? (`/${buinessName}`) : '') + (packageModules[i] ? (`/${packageModules[i]}`) : '');
        src.push(`${projectPath}build/assets/css${modulePathAdd}/**/*.*`);
        const array = readFistLevelFolder(`${projectPath}build\\assets`);
        for (let j = 0; j < array.length; j++) {
            src.push(`${projectPath}build/assets/${array[j]}${modulePathAdd}/**/*.*`);
        }

        packSrcArray.push(src);
    }

    const packObj = {
        clean: {
            src: cleanSrcArray.length > 0 ? cleanSrcArray : `${projectPath}build`
        },
        html: {
            src: htmlSrcArray.length > 0 ? htmlSrcArray : `${projectPath}src/view/**/*.html`,
            srcBase: `${projectPath}src/view`,
            dest: `${projectPath}build`
        },
        sass: {
            src: sassSrcArray.length > 0 ? sassSrcArray : [`${projectPath}src/scss/**/*.scss`, `${projectPath}src/scss/**/*.css`],
            srcBase: sassSrcBaseArray.length > 0 ? sassSrcBaseArray : `${projectPath}src/scss`,
            destBase: sassDestArray.length > 0 ? sassDestArray : `${projectPath}build/assets/css`,
            dest: `${projectPath}build/assets/css`,
            isOpenSourceMap: true,
            isCompress: false,
            compassSetting: {
                imageDest: `${projectPath}build/assets/images`,
                fontSrc: `${projectPath}src/fonts`
            }
        },
        css: {
            src: cssArray.length > 0 ? cssArray : `${projectPath}src/scss/**/*.css`,
            srcBase: `${projectPath}src/scss`,
            dest: `${projectPath}build/assets/css`
        },
        js: {
            src: jsSrcArray.length > 0 ? jsSrcArray : [`${projectPath}src/js/**/*.js`],
            srcBase: `${projectPath}src/js`,
            dest: `${projectPath}build/assets/js`,
            isDelRap: true,
            isMinify: false
        },
        tpl: {
            src: tplSrcArray.length > 0 ? tplSrcArray : `${projectPath}src/tpl/**/*.tpl`,
            srcBase: `${projectPath}src/tpl`,
            dest: `${projectPath}build/assets/template`,
            helperJs: `${projectPath}src/js/template/helper.js`
        },
        img: {
            src: imageSrcArray.length > 0 ? imageSrcArray : `${projectPath}src/images/**/*.*`,
            srcBase: `${projectPath}src/images`,
            dest: `${projectPath}build/assets/images`
        },
        font: {
            src: fontSrcArray.length > 0 ? fontSrcArray : `${projectPath}src/fonts/**/*.*`,
            srcBase: `${projectPath}src/fonts`,
            dest: `${projectPath}build/assets/fonts`
        },
        oasisl: {
            src: `${projectPath}oasisl/**/*.*`,
            srcBase: projectPath,
            dest: `${projectPath}build`
        },
        others: {
            src: others,
            srcBase: `${projectPath}src`,
            dest: `${projectPath}build/assets`
        },
        iconfont: {
            svgSrc: packageModules.length > 0 ? [`${projectPath}src/icons/${buinessName}/common/assets/*.svg`] : [`${projectPath}src/icons/assets/*.svg`],
            fontName: `${projectName}-icon`,
            cssSrc: packageModules.length > 0 ? `${projectPath}src/icons/${buinessName}/common/templates/${projectName}icon.css` : `${projectPath}src/icons/templates/${projectName}icon.css`,
            fontPath: packageModules.length > 0 ? '../../../fonts/common/' : '../fonts/',
            className: `${projectName}icon`,
            version: '1.0.0',
            cssDest: packageModules.length > 0 ? `${projectPath}build/assets/css/${buinessName}/common` : `${projectPath}build/assets/css/`,
            fontsDest: packageModules.length > 0 ? `${projectPath}build/assets/fonts/${buinessName}/common` : `${projectPath}build/assets/fonts/`
        },
        zip: {
            srcArray: packSrcArray,
            srcBase: `${projectPath}build`,
            dist: projectPath,
            projectName,
            packageModules,
            type: setting.package.type,
            version: setting.package.version,
            fileRegExp: setting.package.fileRegExp
        }
    };

    if (setting.supportREM) {
        packObj.compileAutoprefixer = {
            src: `${projectPath}build/assets/css/**/*.css`,
            dest: `${projectPath}build/assets/css`,
            startLog: '添加rem开始...',
            endLog: '添加rem成功...'
        };
    }

    if (setting.reversion) {
        packObj.reversion = {
            src: `${projectPath}build/**/*.*`,
            dest: `${projectPath}build`
        };
    }

    // rhyton项目支持
    if (setting.projectType === 'rhyton') {
        packObj.js.src.push(`!${projectPath}src/js/common`);
        packObj.js.src.push(`!${projectPath}src/js/common/**`);
        packObj.js.src.push(`!${projectPath}src/js/template`);
        packObj.js.src.push(`!${projectPath}src/js/template/**`);
    }
    return packObj;
}

function getUploadObj(config) {
    const { path, setting } = config;
    const projectPath = `${path}/`;
    const ssh = {
        srcBase: `${projectPath}build`,
        destBase: `${projectPath}release`,
        ignoreFileRegExp: setting.ftp.ignoreFileRegExp,
        sft: {
            host: setting.ftp.host,
            port: setting.ftp.port,
            user: setting.ftp.user,
            pass: setting.ftp.pass,
            remotePath: setting.ftp.remotePath
        },
        type: setting.ftp.ssh
    };
    return ssh;
}

module.exports = { getDevObj, getPackObj, getUploadObj };

