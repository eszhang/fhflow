
const Html = require('./common/html');
const Sass = require('./common/sass');
const Clean = require('./common/clean');
const JavaSript = require('./common/javascript');
const Tpl = require('./common/tpl');
const Image = require('./common/image');
const Font = require('./common/font');
const StartServer = require('./common/startServer').startServer;
const Watch = require('./common/watch');
const Zip = require('./common/zip');
const Ssh = require('./common/ssh');
const async = require('async');
const readFile = require('./common/readFile');;

function dev( path, packageModules){
    var setting = readFile({
        path: path + '/fhflow.config.json'
    });
    setting = JSON.parse(setting);

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


function dist(path,packageModules){
    var setting = readFile({
        path: path + '/fhflow.config.json'
    });
    setting = JSON.parse(setting);

    var devObj = require('./task.config.js').getDistObj({
        path: path, 
        packageModules: packageModules, 
        setting: setting
    });
    var { clean, sass, font, html, img, js, tpl, zip} = devObj;
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



module.exports = {dev,dist};

