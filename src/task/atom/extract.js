
/**
 * extract 操作
 */

const extract = require('extract-zip');

module.exports = function (config = {}, startCb, endCb) {

    const { src, dest } = config;

    startCb && startCb();

    let stream = extract(src, { dir: dest }, function (err) {
        if (err) {
            throw new Error(err);
        }
        endCb && endCb();
    });

    return stream;
}   