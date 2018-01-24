
/**
 * utils
 */

const fs = require('fs');

// 文件是否存在 
function isFileExist(filePath) {
    try {
        const stat = fs.statSync(filePath);
        if (stat.isFile()) {
            return true;
        }
        return false;
    } catch (err) {
        if (err.code === 'ENOENT') {
            return false;
        }
        throw new Error(err);
    }
}

// 目录是否存在
function isDirExist(dirPath) {
    try {
        const stat = fs.statSync(dirPath);
        if (stat.isDirectory()) {
            return true;
        }
        return false;
    } catch (err) {
        if (err.code === 'ENOENT') {
            return false;
        }
        throw new Error(err);
    }
}

// 首字母转化为大写
function firstLetterUpper(name){
    return name.substring(0,1).toUpperCase() + name.substring(1)
}

module.exports = {
    isFileExist,
    isDirExist,
    firstLetterUpper
};
