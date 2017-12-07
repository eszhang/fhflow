
/**
 * clean 操作
 */

const del = require('del');

module.exports = function (config = {}, startCb, endCb) {

    const { src, force = true } = config;

    startCb && startCb();
    let stream = del(src, {
        force: true
    }).then(function () {
        endCb && endCb();
    })

    return stream;
}   