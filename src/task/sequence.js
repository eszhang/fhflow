
const path = require('path');
const { requireUncached, isFileExist, isDirExist } = require('./util/index');
const Html = require('./atom/html');
const Sass = require('./atom/sass');
const Clean = require('./atom/clean');
const JavaSript = require('./atom/javascript');
const Tpl = require('./atom/tpl');
const Image = require('./atom/image');
const Font = require('./atom/font');
const StartServer = require('./atom/startServer').startServer;
const Watch = require('./atom/watch');
const Zip = require('./atom/zip');
const Ssh = require('./atom/ssh');
const async = require('async');

let { getDevObj , getPackObj } = require('./task.config.js');

let { constantConfig , cacheConfig} = require('./common/index'),
    { NAME, ROOT, WORKSPACE, CONFIGNAME, CONFIGPATH, PLATFORM, DEFAULT_PAT, TEMPLAGE_PROJECT, TEMPLAGE_EXAMPLE, EXAMPLE_NAME } = constantConfig,
    { curConfigPath } = cacheConfig;

/*
 * dev task
 */
function dev( projectPath){
    
    curConfigPath = path.join(projectPath, CONFIGNAME);
    let setting = requireUncached(curConfigPath);

    let devConfig = getDevObj({
        path: projectPath, 
        packageModules: setting.modules, 
        setting: setting
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
                    Html(html,function(){
                        cb();
                    });
                },
                function (cb){
                    Sass(sass,function(){
                        cb();
                    });
                },
                function (cb){
                    JavaSript(js,function(){
                        cb();
                    });
                },
                function (cb){
                    Tpl(tpl,function(){
                        cb();
                    });
                },
                function (cb){
                    Image(img,function(){
                        cb();
                    });
                },
                function (cb){
                    Font(font,function(){
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

function dist(){
    
}

function upload(){
    let setting = requireUncached(curConfigPath);
    let sshObj = getUploadObj(setting);
    Ssh(sshObj);
}

function pack(projectPath){
    curConfigPath = path.join(projectPath, CONFIGNAME);

    let setting = requireUncached(curConfigPath);

    let packConfig = getPackObj({
        path: projectPath, 
        packageModules: setting.modules, 
        setting: setting
    });

    let { clean, sass, font, html, img, js, tpl, zip} = packConfig;

    async.series([
        /*
         *  先删除
         */
        function(next){
            Clean(clean,next);
        },
        function(next){
            /*
             * 进行一些同步操作
             */
            async.parallel([
                function (cb) {
                    Html(html,cb);
                },
                function (cb){
                    Sass(sass,cb);
                },
                function (cb){
                    JavaSript(js,cb);
                },
                function (cb){
                    Tpl(tpl,cb);
                },
                function (cb){
                    Image(img,cb);
                },
                function (cb){
                    Font(font,cb);
                }
                
            ],function(error){
                if(error){
                    throw new Error(error);
                }
                next();
            })
        },
        function (cb){
            Zip(zip,cb);
        }
    ])
}

module.exports = {dev,dist,upload,pack};

