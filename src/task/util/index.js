
/**
 * 通用工具函数
 */

const fs = require('fs');

function requireUncached(module) {
    delete require.cache[require.resolve(module)];
    return require(module);
}

function isFileExist(filePath) {
    try {
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        if (err.code === 'ENOENT') {
            return false;
        } else {
            throw new Error(err);
        }
    }
}

function isDirExist(dirPath) {
    try {
        var stat = fs.statSync(dirPath);
        if (stat.isDirectory()) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        if (err.code === 'ENOENT') {
            return false;
        } else {
            throw new Error(err);
        }
    }
}

module.exports = {
    requireUncached,
    isFileExist,
    isDirExist
}