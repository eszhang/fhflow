
/**
 * extract 操作
 */

const extract = require('extract-zip');

module.exports = function (config = {}, cb) {

    const { src, dest } = config;

    let stream = extract(src, {dir: dest}, function (err) {
        if (err) {
            throw new Error(err);
        }
        cb && cb();
    });

    return stream;
}   