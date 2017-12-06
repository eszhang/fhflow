
/*
 *  task 对外接口
 */

const fs = require('fs');
const path = require('path');
const extract =require('./atom/extract');
const copy = require('./atom/copy');
const { dev, dist, upload, pack } = require('./sequence');
const { requireUncached, isFileExist, isDirExist } = require('./util/index');

let { constantConfig , cacheConfig} = require('./common/index'),
    { NAME, ROOT, WORKSPACE, CONFIGNAME, CONFIGPATH, PLATFORM, DEFAULT_PAT, TEMPLAGE_PROJECT, TEMPLAGE_EXAMPLE, EXAMPLE_NAME } = constantConfig,
    { curConfigPath } = cacheConfig;


let action = {
    
    // 新建项目（自动生成脚手架）
    createProject: function(projectPath, callback){
        
        let workspace = path.dirname(projectPath);
        // 先判断工作区是否存在
        if(isDirExist(workspace)){
            try {
                fs.mkdirSync(path.join(workspace));
            } catch (err) {
                throw new Error(err);
            }
        }
        // 创建项目目录
        if (Common.dirExist(projectPath)) {
            throw new Error('project already exists');
        } else {
            try {
                fs.mkdirSync(path.join(projectPath));
            } catch (err) {
                throw new Error(err);
            }
        } 
        //拷贝开发规范脚手架
        extract({
            src: TEMPLAGE_PROJECT,
            dest: projectPath
        }, function(){
            callback && callback();
        });
    },
    
    // 开发
    dev: function (projectPath, packageModules, callback) {
        dev(projectPath, packageModules, callback);
    },

    // 编译
    dist: function (projectPath,packageModules, callback) {
        dist(projectPath, packageModules, callback);
    },

    // 上传
    upload: function (projectPath, callback) {
        upload(projectPath, packageModules, callback);
    },

    // 打包
    pack: function (projectPath, callback) {
        pack(projectPath, packageModules, callback)
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


        fs.writeFile(curConfigPath, JSON.stringify(config, null, 4), function (err) {
            if (err) {
                throw new Error(err);
            }
            callback&&callback(requireUncached(config));
        })
    }

}


//test
action.initConfig('E:/eszhang-git/fhflow/test',function(config){
    console.log(config)
});
action.updateConfig('E:/eszhang-git/fhflow/test', {
    
    "supportREM": true,
    "supportChanged": false,
    "reversion": false,

    "modules": "ALL22",
    "server": {
        "host": "localhost",
        "port": 3333,
        "liverload": true,
        "proxy": []
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
        "version": "0.0.2",
        "fileRegExp": "${name}-${version}-${time}"
    }

});
module.exports = action;


// test
// action.dev('D:/mygit/fhFlowWorkspaceTest/fhflowTest',['backflow','FBI']);
// action.dev('D:/mygit/fhFlowWorkspaceTest/fk',[]);

// action.dist('D:/mygit/fhFlowWorkspaceTest/fhflowTest',['backflow','FBI']);
action.dist('D:/mygit/fhFlowWorkspaceTest/fk',[]);