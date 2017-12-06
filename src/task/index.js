
/*
 *  task 对外接口
 */

const fs = require('fs');
const path = require('path');
const { dev, dist, upload, pack } = require('./sequence');
const { requireUncached, isFileExist, isDirExist } = require('./util/index');
const copy = require('./atom/copy');

let { constantConfig , cacheConfig} = require('./common/index'),
    { NAME, ROOT, WORKSPACE, CONFIGNAME, CONFIGPATH, PLATFORM, DEFAULT_PAT, TEMPLAGE_PROJECT, TEMPLAGE_EXAMPLE, EXAMPLE_NAME } = constantConfig,
    { curConfigPath } = cacheConfig;


let action = {
    
    // 开发
    dev: function (projectPath, packageModules) {
        dev(projectPath, packageModules);
    },

    // 编译
    dist: function (projectPath) {
        dist(projectPath, packageModules);
    },

    // 上传
    upload: function (projectPath) {
        upload(projectPath, packageModules);
    },

    // 打包
    pack: function (projectPath) {
        pack(projectPath, packageModules)
    },
    
    // 初次初始化config
    initConfig: function(projectPath, cb){

        curConfigPath = path.join(projectPath, CONFIGNAME);
        
        if (!isFileExist(curConfigPath)) {
            copy({
                src: CONFIGPATH,
                dest: projectPath,
            }, function(){
                cb&&cb(requireUncached(curConfigPath));
            })
        }else{
            cb&&cb(requireUncached(curConfigPath));
        }
    },

    // 更新config 全量
    updateConfig: function (projectPath, config, cb) {


        fs.writeFile(curConfigPath, JSON.stringify(config, null, 4), function (err) {
            if (err) {
                throw new Error(err);
            }
            cb&&cb(requireUncached(config));
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
action.dev('E:/eszhang-git/fhflow/test/fk',[]);

module.exports = action;