const gulp = require('gulp'),
      watch = require('gulp-watch'),
      del = require('del'),
      CompileHtml = require('./html'),
      CompileSass = require('./compileSass'),
      CompileJavaSript = require('./javascript'),
      CompileTpl = require('./tpl'),
      CompileImage = require('./image'),
      CompileFont = require('./font'),
      reload = require('./util').reload,
      {htmlObj, compileSassObj, cleanObj, jsObj, tplObj, imgObj, fontObj, startServerObj, watchObj} = require('../task.config.js');

module.exports = function(watchObj,cb){
    var watcher = watch(watchObj.watchPath,{ignored: /[\/\\]\./});
    watcher.on('change',function(file){// 修改
        console.log(file + "has been changed");
        watchHandler('changed', file);
    }).on('add',function(file){// 增加
        console.log(file + "has been added");
        watchHandler('add', file);
    }).on('unlink',function(file){// 删除
        console.log(file + "is deleted");
        watchHandler('removed', file);
    })
    cb();

    function watchHandler(type, file){
        let target = file.split(watchObj.baseSrc)[1].match(/[\/\\](\w+)[\/\\]/);
        if(target.length && target[1]){
            target = target[1];
        }
        switch(target){
            case 'images': 
                if(type === 'removed'){
                    let tmp = file.replace(watchObj.baseSrc,'build\\assets')
                    del([tmp],{force:true}).then(function(){
                        reload ? reload() : undefined;
                    })
                }else{
                    CompileImage(imgObj);
                }
                break;
            case 'js':
                if(type === 'removed'){
                    let tmp = file.replace(watchObj.baseSrc,'build\\assets')
                    del([tmp],{force:true}).then(function(){
                        reload ? reload() : undefined;
                    })
                }else{
                    CompileJavaSript(jsObj);
                }
                break;
            case 'scss':
                if(type === 'removed'){
                    let tmp = file.replace(watchObj.baseSrc + '\\scss','build\\assets\\css').replace(".scss",'.css')
                    let tmp2 = tmp.replace(".css",'.css.map')
                    del([tmp,tmp2],{force:true}).then(function(){
                        reload ? reload() : undefined;
                    })
                }else{
                    CompileSass(compileSassObj);
                }
                break;
            case 'view':
                if(type === 'removed'){
                    let tmp = file.replace(watchObj.baseSrc,'build' );
                    del([tmp],{force:true}).then(function(){
                        reload ? reload() : undefined;
                    })
                }else{
                    CompileHtml(htmlObj);
                }
                break;
            case 'tpl':
                if(type === 'removed'){
                    let tmp = file.replace(watchObj.baseSrc + '\\tpl','build\\assets\\template').replace(".tpl",'.js');
                    del([tmp],{force:true}).then(function(){
                        reload ? reload() : undefined;
                    })
                }else{
                    CompileTpl(tplObj);
                }
                break;
            case 'font':
                if(type === 'removed'){
                    let tmp = file.replace(watchObj.baseSrc,'build\\assets');
                    del([tmp],{force:true}).then(function(){
                        reload ? reload() : undefined;
                    })
                }else{
                    CompileFont(fontObj);
                }
                break;
        }
    }

}