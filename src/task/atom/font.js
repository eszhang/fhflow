
/**
 * font 操作
 */

const copy = require('./copy');

module.exports = function (config = {}, cbs = {}) {
    return copy(config, cbs);
};
