
/**
 * 读取配置文件
 */

const fs = require('fs');

module.exports = function (config, cb) {

    const { path } = config;

    let data = fs.readFileSync(path, 'utf-8');
    let setting = JSON.parse(data);
    cb && cb();

    return setting;

}