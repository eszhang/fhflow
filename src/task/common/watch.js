const gulp = require('gulp');
const watch = require('gulp-watch');
const del = require('del');
const CompileHtml = require('./html');
const CompileSass = require('./compileSass');
const CompileJavaSript = require('./javascript');
const CompileTpl = require('./tpl');
const CompileImage = require('./image');
const CompileFont = require('./font');
const reload = require('./util').reload;
      

module.exports = function(config, devObj, cb){

    const {srcBase, watchPath} = config;
    const {html, compileSass, clean, js, tpl, img, font} = devObj;
    
    var watcher = watch(watchPath,{ignored: /[\/\\]\./});
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
        let target = file.split(srcBase)[1].match(/[\/\\](\w+)[\/\\]/);
        if(target.length && target[1]){
            target = target[1];
        }
        switch(target){
            case 'images': 
                if(type === 'removed'){
                    let tmp = file.replace(srcBase,'build\\assets')
                    del([tmp],{force:true}).then(function(){
                        reload && reload();
                    })
                }else{
                    CompileImage(img);
                }
                break;
            case 'js':
                if(type === 'removed'){
                    let tmp = file.replace(srcBase,'build\\assets')
                    del([tmp],{force:true}).then(function(){
                        reload && reload();
                    })
                }else{
                    CompileJavaSript(js);
                }
                break;
            case 'scss':
                if(type === 'removed'){
                    let tmp = file.replace(srcBase + '\\scss','build\\assets\\css').replace(".scss",'.css')
                    let tmp2 = tmp.replace(".css",'.css.map')
                    del([tmp,tmp2],{force:true}).then(function(){
                        reload && reload();
                    })
                }else{
                    CompileSass(compileSass);
                }
                break;
            case 'view':
                if(type === 'removed'){
                    let tmp = file.replace(srcBase,'build' );
                    del([tmp],{force:true}).then(function(){
                        reload && reload();
                    })
                }else{
                    CompileHtml(html);
                }
                break;
            case 'tpl':
                if(type === 'removed'){
                    let tmp = file.replace(srcBase + '\\tpl','build\\assets\\template').replace(".tpl",'.js');
                    del([tmp],{force:true}).then(function(){
                        reload && reload();
                    })
                }else{
                    CompileTpl(tpl);
                }
                break;
            case 'font':
                if(type === 'removed'){
                    let tmp = file.replace(srcBase,'build\\assets');
                    del([tmp],{force:true}).then(function(){
                        reload && reload();
                    })
                }else{
                    CompileFont(font);
                }
                break;
        }
    }

}