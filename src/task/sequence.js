
const path = require('path');
const { requireUncached, isFileExist, isDirExist } = require('./util/index');
const CompileHtml = require('./atom/html');
const Sass = require('./atom/sass');
const Clean = require('./atom/clean');
const CompileJavaSript = require('./atom/javascript');
const CompileTpl = require('./atom/tpl');
const CompileImage = require('./atom/image');
const CompileFont = require('./atom/font');
const StartServer = require('./atom/startServer').startServer;
const Watch = require('./atom/watch');
const Zip = require('./atom/zip');
const Ssh = require('./atom/ssh');
const async = require('async');
const readJson = require('./atom/readJson');

let { getDevObj } = require('./task.config.js');

let { constantConfig , cacheConfig} = require('./common/index'),
    { NAME, ROOT, WORKSPACE, CONFIGNAME, CONFIGPATH, PLATFORM, DEFAULT_PAT, TEMPLAGE_PROJECT, TEMPLAGE_EXAMPLE, EXAMPLE_NAME } = constantConfig,
    { curConfigPath } = cacheConfig;

/*
 * dev task
 */
function dev( projectPath, packageModules){
    
    curConfigPath = path.join(projectPath, CONFIGNAME);

    let devConfig = getDevObj({
        path: projectPath, 
        packageModules: packageModules, 
        setting: requireUncached(curConfigPath)
    });

    let { clean, sass, font, html, img, js, tpl, startServer, watch} = devConfig;
    
    async.series([
        /*
         *  先删除
         */
        function(next){
            Clean(clean,next);
        },
        function(next){
            /**
             * 进行一些同步操作
             */
            async.parallel([
                function (cb) {
                    CompileHtml(html,function(){
                        cb();
                    });
                },
                function (cb){
                    Sass(sass,function(){
                        cb();
                    });
                },
                function (cb){
                    CompileJavaSript(js,function(){
                        cb();
                    });
                },
                function (cb){
                    CompileTpl(tpl,function(){
                        cb();
                    });
                },
                function (cb){
                    CompileImage(img,function(){
                        cb();
                    });
                },
                function (cb){
                    CompileFont(font,function(){
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
        function (next){
            Watch(watch,devConfig,function(){
                next();
            });
        },
        function (next){
            StartServer(startServer,function(){
                next();
            });
        }
    ])
}


/*
 * dist task
 */
function dist(path,packageModules,projectName){
    var {htmlObj, compileSassObj, cleanObj, jsObj, tplObj, imgObj, fontObj, startServerObj, watchObj, zipObj, sshObj} = require('./task.config.js').getDistObj(path,packageModules,projectName);
    async.series([
        /*
         *  先删除
         */
        function(next){
            Clean(cleanObj,next);
        },
        function(next){
            /*
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



module.exports = {dev,dist};

