
/**
 * clean 操作
 */

const del = require('del');

module.exports = (config = {}, cbs = {}) => {
    const { src, force = true } = config;
    const {
        start = function () { },
        log = function () { },
        end = function () { }
    } = cbs;

    start();

    const stream = del(src, {
        force
    }).then(() => {
        end();
    }, (err) => {
        log(err);
    });

    return stream;
};
