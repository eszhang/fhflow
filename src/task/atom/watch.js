
/**
 * watch 操作
 */

const gulp = require('gulp');
const watch = require('gulp-watch');
const del = require('del');
const CompileHtml = require('./html');
const Sass = require('./sass');
const CompileJavaSript = require('./javascript');
const CompileTpl = require('./tpl');
const CompileImage = require('./image');
const CompileFont = require('./font');


module.exports = function (config = {}, devObj, startCb, endCb) {

    const { srcBase, watchPath } = config;
    const { html, sass, clean, js, tpl, img, font } = devObj;

    startCb && startCb();

    let watcher = watch(watchPath, { ignored: /[\/\\]\./ });
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
        switch (target) {
            case 'images':
                if (type === 'removed') {
                    let tmp = file.replace(srcBase, 'build\\assets')
                    del([tmp], { force: true }).then(function () {
                    })
                } else {
                    CompileImage(img);
                }
                break;
            case 'js':
                if (type === 'removed') {
                    let tmp = file.replace(srcBase, 'build\\assets')
                    del([tmp], { force: true }).then(function () {
                    })
                } else {
                    CompileJavaSript(js);
                }
                break;
            case 'scss':
                if (type === 'removed') {
                    let tmp = file.replace(srcBase + '\\scss', 'build\\assets\\css').replace(".scss", '.css')
                    let tmp2 = tmp.replace(".css", '.css.map')
                    del([tmp, tmp2], { force: true }).then(function () {
                    })
                } else {
                    Sass(sass);
                }
                break;
            case 'view':
                if (type === 'removed') {
                    let tmp = file.replace(srcBase, 'build');
                    del([tmp], { force: true }).then(function () {
                    })
                } else {
                    CompileHtml(html);
                }
                break;
            case 'tpl':
                if (type === 'removed') {
                    let tmp = file.replace(srcBase + '\\tpl', 'build\\assets\\template').replace(".tpl", '.js');
                    del([tmp], { force: true }).then(function () {
                    })
                } else {
                    CompileTpl(tpl);
                }
                break;
            case 'font':
                if (type === 'removed') {
                    let tmp = file.replace(srcBase, 'build\\assets');
                    del([tmp], { force: true }).then(function () {
                    })
                } else {
                    CompileFont(font);
                }
                break;
        }
    }

}