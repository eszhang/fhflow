
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


function dev(path,packageModules,projectName){
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
            Watch(watchObj,path,packageModule,cb);
        },
        function (cb){
            if(isOpenStartServer){
                StartServer(startServerObj,cb);
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

// var htmlObj = {
//             src: ['D:/mygit/fhFlowWorkspaceTest/fhflowTest/src/view/hero/**/*.html','D:/mygit/fhFlowWorkspaceTest/fhflowTest/src/view/backflow/**/*.html'],
//             baseSrc: 'D:/mygit/fhFlowWorkspaceTest/fhflowTest/src/view',
//             dest: 'D:/mygit/fhFlowWorkspaceTest/fhflowTest/build',
//             logInfo: 'html编译成功'
//         };
// CompileHtml(htmlObj);
module.exports = {dev,dist};

