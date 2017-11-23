
const CompileHtml = require('./common/html'),
      CompileSass = require('./common/compileSass'),
      Clean = require('./common/clean'),
      CompileJavaSript = require('./common/javascript'),
      CompileTpl = require('./common/tpl'),
      CompileImage = require('./common/image'),
      CompileFont = require('./common/font'),
      StartServer = require('./common/startServer').startServer,
      Watch = require('./common/watch'),
      async = require('async'),
      {htmlObj, compileSassObj, cleanObj, jsObj, tplObj, imgObj, fontObj, startServerObj, watchObj} = require('./task.config.js');




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
        Watch(watchObj,cb);
    },
    function (cb){
        StartServer(startServerObj,cb);
    }
])



