
const CompileHtml = require('./common/html');
const Sass = require('./common/sass');
const Clean = require('./common/clean');
const CompileJavaSript = require('./common/javascript');
const CompileTpl = require('./common/tpl');
const CompileImage = require('./common/image');
const CompileFont = require('./common/font');
const StartServer = require('./common/startServer').startServer;
const Watch = require('./common/watch');
const Zip = require('./common/zip');
const Ssh = require('./common/ssh');
const async = require('async');
const readJson = require('./common/readJson');;

function dev( path, packageModules){
    var setting = readJson({
        path: path + '/fhflow.config.json'
    });
    var devObj = require('./task.config.js').getDevObj({
        path: path, 
        packageModules: packageModules, 
        setting: setting
    });
    var { clean, sass, font, html, img, js, tpl, startServer, watch} = devObj;
    async.series([
        /**
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
        function (cb){
            Watch(watch,devObj,function(){
                cb();
            });
        },
        function (cb){
            StartServer(startServer,function(){
                cb();
            });
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



module.exports = {dev,dist};

