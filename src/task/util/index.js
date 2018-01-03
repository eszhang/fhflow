
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

function renameProject(oldPath,newPath) {
    try {
        if(oldPath !== newPath){
            // fs.rename(oldPath,newPath, function(err){
            //     if(err){
            //         throw err;
            //     }
            //     console.log('done!');
            // })
            fs.renameSync(oldPath,newPath)
        }
    } catch (err) {
        if (err.code === 'ENOENT') {
            return false;
        } else {
            throw new Error(err);
        }
    }
}

function readFile(config, cb) {
    
    const { path } = config;

    let data = fs.readFileSync(path, 'utf-8');
    cb && cb();

    return data;

}

function writeFile(config, cb) {
    
    const { path } = config;

    let data = fs.writeFileSync(path, 'utf-8');
    cb && cb();

    return data;

}

function reloadHandler(path){
    require('browser-sync').get(path).reload();
}


function readFistLevelFolder(path){
    try {
        var names = fs.readdirSync(path);
        return names;
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
    isDirExist,
    readFile,
    writeFile,
    reloadHandler,
    renameProject ,
    readFistLevelFolder
}