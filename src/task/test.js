const CompileHtml = require('./common/html'),
      CompileSass = require('./common/compileSass'),
      Clean = require('./common/clean'),
      CompileJavaSript = require('./common/javascript'),
      CompileTpl = require('./common/tpl'),
      CompileImage = require('./common/image'),
      CompileFont = require('./common/font'),
      StartServer = require('./common/startServer').startServer,
      Watch = require('./common/watch'),
      Zip = require('./common/zip'),
      Ssh = require('./common/ssh'),
      async = require('async');

// var cleanObj = {
//             src: ['D:/mygit/fhFlowWorkspaceTest/fhflowTest/build/assets/*/hero/backflow','D:/mygit/fhFlowWorkspaceTest/fhflowTest/build/hero/backflow'],
//             logInfo: '删除陈宫'
//         };
// Clean(cleanObj);

// var htmlObj = {
//             src: ['D:/mygit/fhFlowWorkspaceTest/fhflowTest/src/view/hero/FBI/**/*.html','D:/mygit/fhFlowWorkspaceTest/fhflowTest/src/view/hero/backflow/**/*.html'],
//             srcBase: 'D:/mygit/fhFlowWorkspaceTest/fhflowTest/src/view',
//             dest: 'D:/mygit/fhFlowWorkspaceTest/fhflowTest/build',
//             logInfo: 'html编译成功'
//         };
// CompileHtml(htmlObj);

// var javaObj = {
//     src: ['D:/mygit/fhFlowWorkspaceTest/fhflowTest/src/js/hero/FBI/**/*.js','D:/mygit/fhFlowWorkspaceTest/fhflowTest/src/js/hero/backflow/**/*.js'],
//     srcBase: 'D:/mygit/fhFlowWorkspaceTest/fhflowTest/src/js',
//     dest: 'D:/mygit/fhFlowWorkspaceTest/fhflowTest/build/assets/js',
//     isDelRap: false,
//     isMinify: false,
//     logInfo: 'html编译成功'
// };
// CompileJavaSript(javaObj);

// var tplObj = {
//     src: ['D:/mygit/fhFlowWorkspaceTest/fhflowTest/src/tpl/hero/FBI/**/*.tpl','D:/mygit/fhFlowWorkspaceTest/fhflowTest/src/tpl/backflow/**/*.tpl'],
//     srcBase: 'D:/mygit/fhFlowWorkspaceTest/fhflowTest/src/tpl',
//     dest: 'D:/mygit/fhFlowWorkspaceTest/fhflowTest/build/assets/template',
//     isDelRap: false,
//     isMinify: false,
//     logInfo: 'html编译成功'
// };
// CompileTpl(tplObj);

var imageObj = {
    src: ['D:/mygit/fhFlowWorkspaceTest/fhflowTest/src/images/hero/FBI/**/*.*','D:/mygit/fhFlowWorkspaceTest/fhflowTest/src/images/backflow/**/*.*'],
    srcBase: 'D:/mygit/fhFlowWorkspaceTest/fhflowTest/src/images',
    dest: 'D:/mygit/fhFlowWorkspaceTest/fhflowTest/build/assets/images',
    logInfo: 'html编译成功'
};
CompileImage(imageObj);

// var fontsObj = {
//     src: ['D:/mygit/fhFlowWorkspaceTest/fhflowTest/src/fonts/hero/FBI/**/*.*','D:/mygit/fhFlowWorkspaceTest/fhflowTest/src/fonts/backflow/**/*.*'],
//     srcBase: 'D:/mygit/fhFlowWorkspaceTest/fhflowTest/src/fonts',
//     dest: 'D:/mygit/fhFlowWorkspaceTest/fhflowTest/build/assets/fonts',
//     logInfo: 'html编译成功'
// };
// CompileFont(fontsObj);

// var startServerObj= {
//             srcBase: 'D:/mygit/fhFlowWorkspaceTest/fhflowTest/build',
//             startPath: '',
//             port: 8089,
//             logInfo: '服务打开成功'
//         };
// StartServer(startServerObj);

// var compileSassObj = {
//             src: ['D:/mygit/fhFlowWorkspaceTest/fhflowTest/src/scss/hero/**/*.scss','D:/mygit/fhFlowWorkspaceTest/fhflowTest/src/view/backflow/**/*.scss'],
//             srcBase: 'D:/mygit/fhFlowWorkspaceTest/fhflowTest/src/scss' ,
//             dest: 'D:/mygit/fhFlowWorkspaceTest/fhflowTest/build/assets/css' ,
//             isOpenSourceMap: true,
//             isCompress: false,
//             compassSetting: {
//                 imageDest: 'D:/mygit/fhFlowWorkspaceTest/fhflowTest/build/assets/images' ,
//                 fontSrc: 'D:/mygit/fhFlowWorkspaceTest/fhflowTest/src/fonts',
//             },
//             logInfo: '编译sass成功'
//         };
// CompileSass(compileSassObj);