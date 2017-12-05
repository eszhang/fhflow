/**
 * 读取配置文件
 */
var fs = require('fs');//调用fs函数库

module.exports = function (config, cb) {

    const { path } = config;

    var data = fs.readFileSync(path, 'utf-8');
    var setting = JSON.parse(data);
    cb && cb();
    return setting;

}