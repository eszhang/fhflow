
/**
 * extract 操作
 */

const extract = require('extract-zip');

module.exports = (config = {}, cbs = {}) => {
    const { src, dest } = config;
    const {
        start = function () { },
        log = function () { },
        end = function () { }
    } = cbs;

    start();

    const stream = extract(src, {
        dir: dest
    }, (err) => {
        if (err) {
            log(err);
        } else {
            end();
        }
    });

    return stream;
};
