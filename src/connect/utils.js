
/**
 * utils
 */

const fs = require('fs');

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

function firstLetterUpper(name){
    return name.substring(0,1).toUpperCase() + name.substring(1)
}

module.exports = {
    isFileExist,
    isDirExist,
    firstLetterUpper
};
