
/**
 * image 操作
 */

const copy = require('./copy');

module.exports = function (config = {}, startCb, endCb) {

    return copy(config, startCb, endCb)
} 