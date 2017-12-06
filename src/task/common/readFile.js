
/**
 * 读取配置文件
 */

const fs = require('fs');

module.exports = function (config, cb) {

    const { path } = config;

    let data = fs.readFileSync(path, 'utf-8');
    cb && cb();

    return data;

}