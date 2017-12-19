
/**
 * watch 操作
 */

const watchAtom = require('gulp-watch');
const delAtom = require('del');
const htmlAtom = require('./html');
const sassAtom = require('./sass');
const javaSriptAtom = require('./javascript');
const tplAtom = require('./tpl');
const imageAtom = require('./image');
const fontAtom = require('./font');
const remAtom = require('./rem');


module.exports = function (config = {}, loggerhandler, startCb, endCb) {

    const { html, sass, clean, js, tpl, img, font, watch, bs } = config;
    const { srcBase, watchPath, liverload } = watch;


    startCb && startCb();

    let watcher = watchAtom(watchPath, { ignored: /[\/\\]\./ });
    watcher.on('change', function (file) {
        console.log(file + "has been changed");
        watchHandler('changed', file);
    }).on('add', function (file) {
        console.log(file + "has been added");
        watchHandler('add', file);
    }).on('unlink', function (file) {
        console.log(file + "is deleted");
        watchHandler('removed', file);
    })

    endCb && endCb();

    function watchHandler(type, file) {
        let target = file.split(srcBase)[1].match(/[\/\\](\w+)[\/\\]/);
        if (target.length && target[1]) {
            target = target[1];
        }
        loggerhandler({
            desc: target + " has been " + type,
            type: "info"
        })
        switch (target) {
            case 'images':
                if (type === 'removed') {
                    let tmp = file.replace(srcBase, 'build\\assets')
                    delAtom([tmp], { force: true }).then(function () {
                        liverload && bs.reload();
                    })
                } else {
                    imageAtom(img,function(){},function(){
                        liverload && bs.reload();
                    });
                }
                break;
            case 'js':
                if (type === 'removed') {
                    let tmp = file.replace(srcBase, 'build\\assets')
                    delAtom([tmp], { force: true }).then(function () {
                        liverload && bs.reload();
                    })
                } else {
                    javaSriptAtom(js,function(){},function(){
                        liverload && bs.reload();
                    });
                }
                break;
            case 'scss':
                if (type === 'removed') {
                    let tmp = file.replace(srcBase + '\\scss', 'build\\assets\\css').replace(".scss", '.css')
                    let tmp2 = tmp.replace(".css", '.css.map')
                    delAtom([tmp, tmp2], { force: true }).then(function () {
                        liverload && bs.reload();
                    })
                } else {
                    sassAtom(sass,function(){},function(){
                        if(config.compileAutoprefixer){
                            remAtom(config.compileAutoprefixer,function(){},function(){
                                liverload && bs.reload();
                            })
                        }else{
                            liverload && bs.reload();
                        }
                    });
                    
                }
                break;
            case 'view':
                if (type === 'removed') {
                    let tmp = file.replace(srcBase, 'build');
                    delAtom([tmp], { force: true }).then(function () {
                        liverload && bs.reload();
                    })
                } else {
                    htmlAtom(html,function(){},function(){
                        liverload && bs.reload();
                    });
                }
                break;
            case 'tpl':
                if (type === 'removed') {
                    let tmp = file.replace(srcBase + '\\tpl', 'build\\assets\\template').replace(".tpl", '.js');
                    delAtom([tmp], { force: true }).then(function () {
                        liverload && bs.reload();
                    })
                } else {
                    tplAtom(tpl,function(){},function(){
                        liverload && bs.reload();
                    });
                }
                break;
            case 'font':
                if (type === 'removed') {
                    let tmp = file.replace(srcBase, 'build\\assets');
                    delAtom([tmp], { force: true }).then(function () {
                        liverload && bs.reload();
                    })
                } else {
                    fontAtom(font,function(){},function(){
                        liverload && bs.reload();
                    });
                }
                break;
        }
    }

}