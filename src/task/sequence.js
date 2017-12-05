
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


function dev(path,packageModules){
    readFhflowJson(projectPath + '/fhflow.config.json',packageModules,dev);
    for( var i = 0; i < packageModules.length; i++ ){
        var isOpenStartServer,
            isClean;
        isOpenStartServer = (i === packageModules.length-1 ? true : false);
        isClean = ( i === 0 ? true : false);
        singleDev(path,packageModules[i],projectName,isClean,isOpenStartServer);
    }
    
}

function singleDev( path, packageModule, projectName, isClean, isOpenStartServer ){
    var {htmlObj, compileSassObj, cleanObj, jsObj, tplObj, imgObj, fontObj, startServerObj, watchObj, zipObj, sshObj} = require('./task.config.js').getDevObj(path,packageModule,projectName);
    async.series([
        /**
         *  先删除
         */
        function(next){
            if(isClean){
                Clean(cleanObj,next);
            }else{
                next();
            }
        },
        function(next){
            /**
             * 进行一些同步操作
             */
            async.parallel([
                function (cb) {
                    CompileHtml(htmlObj,function(){
                        cb();
                    });
                },
                function (cb){
                    CompileSass(compileSassObj,function(){
                        cb();
                    });
                },
                function (cb){
                    CompileJavaSript(jsObj,function(){
                        cb();
                    });
                },
                function (cb){
                    CompileTpl(tplObj,function(){
                        cb();
                    });
                },
                function (cb){
                    CompileImage(imgObj,function(){
                        cb();
                    });
                },
                function (cb){
                    CompileFont(fontObj,function(){
                        cb();
                    });
                }
                
            ],function(error){
                if(error){
                    throw new Error(error);
                }
                next();
            })
        },
        function (cb){
            Watch(watchObj,path,packageModule,function(){
                cb();
            });
        },
        function (cb){
            if(isOpenStartServer){
                StartServer(startServerObj,function(){
                    cb();
                });
            }
        }
    ])
}


function dist(path,packageModules,projectName){
    var {htmlObj, compileSassObj, cleanObj, jsObj, tplObj, imgObj, fontObj, startServerObj, watchObj, zipObj, sshObj} = require('./task.config.js').getDistObj(path,packageModules,projectName);
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
                    CompileTpl(tplObj,cb);
                },
                function (cb){
                    CompileImage(imgObj,cb);
                },
                function (cb){
                    CompileFont(fontObj,cb);
                }
                
            ],function(error){
                if(error){
                    throw new Error(error);
                }
                next();
            })
        },
        function (cb){
            Ssh(sshObj,cb);
        },
        function (cb){
            Zip(zipObj,cb);
        }
    ])
}

// var cleanObj = {
//             src: ['D:/mygit/fhFlowWorkspaceTest/fhflowTest/build/assets/*/hero/backflow','D:/mygit/fhFlowWorkspaceTest/fhflowTest/build/hero/backflow'],
//             logInfo: '删除陈宫'
//         };
// Clean(cleanObj);

// var htmlObj = {
//             src: ['D:/mygit/fhFlowWorkspaceTest/fhflowTest/src/view/hero/**/*.html','D:/mygit/fhFlowWorkspaceTest/fhflowTest/src/view/backflow/**/*.html'],
//             srcBase: 'D:/mygit/fhFlowWorkspaceTest/fhflowTest/src/view',
//             dest: 'D:/mygit/fhFlowWorkspaceTest/fhflowTest/build',
//             logInfo: 'html编译成功'
//         };
// CompileHtml(htmlObj);

// var javaObj = {
//     src: ['D:/mygit/fhFlowWorkspaceTest/fhflowTest/src/js/hero/**/*.js','D:/mygit/fhFlowWorkspaceTest/fhflowTest/src/js/backflow/**/*.js'],
//     srcBase: 'D:/mygit/fhFlowWorkspaceTest/fhflowTest/src/js',
//     dest: 'D:/mygit/fhFlowWorkspaceTest/fhflowTest/build/assets/js',
//     isDelRap: false,
//     isMinify: false,
//     logInfo: 'html编译成功'
// };
// CompileJavaSript(javaObj);

// var tplObj = {
//     src: ['D:/mygit/fhFlowWorkspaceTest/fhflowTest/src/tpl/hero/**/*.tpl','D:/mygit/fhFlowWorkspaceTest/fhflowTest/src/tpl/backflow/**/*.tpl'],
//     srcBase: 'D:/mygit/fhFlowWorkspaceTest/fhflowTest/src/tpl',
//     dest: 'D:/mygit/fhFlowWorkspaceTest/fhflowTest/build/assets/template',
//     isDelRap: false,
//     isMinify: false,
//     logInfo: 'html编译成功'
// };
// CompileTpl(tplObj);

// var imageObj = {
//     src: ['D:/mygit/fhFlowWorkspaceTest/fhflowTest/src/images/hero/**/*.*','D:/mygit/fhFlowWorkspaceTest/fhflowTest/src/images/backflow/**/*.*'],
//     srcBase: 'D:/mygit/fhFlowWorkspaceTest/fhflowTest/src/images',
//     dest: 'D:/mygit/fhFlowWorkspaceTest/fhflowTest/build/assets/images',
//     logInfo: 'html编译成功'
// };
// CompileImage(imageObj);

// var fontsObj = {
//     src: ['D:/mygit/fhFlowWorkspaceTest/fhflowTest/src/fonts/hero/**/*.*','D:/mygit/fhFlowWorkspaceTest/fhflowTest/src/fonts/backflow/**/*.*'],
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

module.exports = {dev,dist};

