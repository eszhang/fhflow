
/**
 * clean 操作
 */

const del = require('del');

module.exports = function (config = {}, cb) {

    const { src, force = true } = config;

    let stream = del(src, {
        force: true
    }).then(function () {
        cb && cb();
    })

    return stream;
}   