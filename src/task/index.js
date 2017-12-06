
/*
 *  task 对外接口
 */

const fs = require('fs');
const path = require('path');
const extract =require('./atom/extract');
const copy = require('./atom/copy');
const {bs} = require('./atom/startServer');
const { dev, dist, upload, pack } = require('./sequence');
const { requireUncached, isFileExist, isDirExist } = require('./util/index');

let { constantConfig , cacheConfig} = require('./common/index'),
    { NAME, ROOT, WORKSPACE, CONFIGNAME, CONFIGPATH, PLATFORM, DEFAULT_PAT, TEMPLAGE_PROJECT, TEMPLAGE_EXAMPLE, EXAMPLE_NAME } = constantConfig,
    { curConfigPath } = cacheConfig;


let action = {
    
    // 生成脚手架
    copyProjectExample: function(projectPath, callback){
        extract({
            src: TEMPLAGE_PROJECT,
            dest: projectPath
        }, function(){
            callback && callback();
        });
    },
    
    // 开发
    dev: function (projectPath,  callback) {
        dev(projectPath,  callback);
    },

    // 编译
    dist: function (projectPath, callback) {
        dist(projectPath, callback);
    },

    // 上传
    upload: function (projectPath, callback) {
        upload(projectPath, callback);
    },

    // 打包
    pack: function (projectPath, callback) {
        pack(projectPath, callback)
    },

    close: function(){
        bs.exit();
    },
    
    // 初次初始化config
    initConfig: function(projectPath, callback){

        curConfigPath = path.join(projectPath, CONFIGNAME);
        
        if (!isFileExist(curConfigPath)) {
            copy({
                src: CONFIGPATH,
                dest: projectPath,
            }, function(){
                callback&&callback(requireUncached(curConfigPath));
            })
        }else{
            callback&&callback(requireUncached(curConfigPath));
        }
    },

    // 更新config 全量
    updateConfig: function (projectPath, config, callback) {

        curConfigPath = path.join(projectPath, CONFIGNAME);

        fs.writeFile(curConfigPath, JSON.stringify(config, null, 4), function (err) {
            if (err) {
                throw new Error(err);
            }
            callback&&callback(requireUncached(config));
        })
    }

}


//test
// action.copyProjectExample('E:/eszhang-git/fhflow/test/fk-01', function(){
//     console.log("create project success....")
// });
// action.initConfig('E:/eszhang-git/fhflow/test',function(config){
//     console.log(config)
// });
action.updateConfig('D:/mygit/fhFlowWorkspaceTest/fhflowTest', {
    "supportREM": true,
    "supportChanged": false,
    "reversion": false,
    "modules": ["backflow","FBI"],
    "businessName": "hero",
    "server": {
        "host": "localhost",
        "port": 8089,
        "liverload": true,
        "proxys": []
    },
    "ftp": {
        "host": "",
        "port": "",
        "user": "",
        "pass": "",
        "remotePath": "",
        "ignoreFileRegExp": "",
        "ssh": false
    },
    "package": {
        "type": "zip",
        "version": "0.0.1",
        "fileRegExp": "${name}-${moduleName}-${version}-${time}"
    }
});

// action.dev('D:/mygit/fhFlowWorkspaceTest/fhflowTest');
// action.pack('D:/mygit/fhFlowWorkspaceTest/fhflowTest');
// action.upload('E:/eszhang-git/fhflow/test/fk');
action.pack('D:/mygit/fhFlowWorkspaceTest/fhflowTest');
// action.pack('D:/mygit/fhFlowWorkspaceTest/fk');
module.exports = action;

