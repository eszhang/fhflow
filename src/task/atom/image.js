
/**
 * image 操作
 */

const copy = require('./copy');

module.exports = function (config = {}, cb) {

    return copy(config, cb)
} 