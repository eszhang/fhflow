
/**
 * 通用工具函数
 */

const fs = require('fs');

// 读取新模块数据
function requireUncached(module) {
    delete require.cache[require.resolve(module)];
    return require(module);
}

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

// 文件重命名
function renameProject(oldPath, newPath) {
    try {
        if (oldPath !== newPath) {
            fs.renameSync(oldPath, newPath);
        }
        return false;
    } catch (err) {
        if (err.code === 'ENOENT') {
            return false;
        }
        throw new Error(err);
    }
}

// 读取目录
function readFistLevelFolder(path) {
    try {
        const names = fs.readdirSync(path);
        return names;
    } catch (err) {
        if (err.code === 'ENOENT') {
            return false;
        }
        throw new Error(err);
    }
}

module.exports = {
    requireUncached,
    isFileExist,
    isDirExist,
    renameProject,
    readFistLevelFolder
};
