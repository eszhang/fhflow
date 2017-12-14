
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


module.exports = function (config = {}, loggerhandler, startCb, endCb) {

    const { html, sass, clean, js, tpl, img, font, watch } = config;
    const { srcBase, watchPath, supportChanged } = watch;


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
                    })
                } else {
                    imageAtom(img);
                }
                break;
            case 'js':
                if (type === 'removed') {
                    let tmp = file.replace(srcBase, 'build\\assets')
                    delAtom([tmp], { force: true }).then(function () {
                    })
                } else {
                    javaSriptAtom(js);
                }
                break;
            case 'scss':
                if (type === 'removed') {
                    let tmp = file.replace(srcBase + '\\scss', 'build\\assets\\css').replace(".scss", '.css')
                    let tmp2 = tmp.replace(".css", '.css.map')
                    delAtom([tmp, tmp2], { force: true }).then(function () {
                    })
                } else {
                    sassAtom(sass);
                }
                break;
            case 'view':
                if (type === 'removed') {
                    let tmp = file.replace(srcBase, 'build');
                    delAtom([tmp], { force: true }).then(function () {
                    })
                } else {
                    htmlAtom(html);
                }
                break;
            case 'tpl':
                if (type === 'removed') {
                    let tmp = file.replace(srcBase + '\\tpl', 'build\\assets\\template').replace(".tpl", '.js');
                    delAtom([tmp], { force: true }).then(function () {
                    })
                } else {
                    tplAtom(tpl);
                }
                break;
            case 'font':
                if (type === 'removed') {
                    let tmp = file.replace(srcBase, 'build\\assets');
                    delAtom([tmp], { force: true }).then(function () {
                    })
                } else {
                    fontAtom(font);
                }
                break;
        }
    }

}