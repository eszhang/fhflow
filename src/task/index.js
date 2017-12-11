
/*
 * task 对外接口
 */

const fs = require('fs');
const path = require('path');
const extract =require('./atom/extract');
const copy = require('./atom/copy');
const {bs} = require('./atom/startServer');
const { dev, dist, upload, pack } = require('./sequence');
const { requireUncached, isFileExist, isDirExist } = require('./util/index');

let { constantConfig , cacheConfig} = require('./common/index'),
    { NAME, ROOT, WORKSPACE, CONFIGNAME, CONFIGPATH, PLATFORM, DEFAULT_PAT, TEMPLAGE_PROJECT, TEMPLAGE_EXAMPLE, EXAMPLE_NAME } = constantConfig;


let action = {
    
    //生成脚手架
    copyProjectExample: function(projectPath, callback){
        extract({
            src: TEMPLAGE_PROJECT,
            dest: projectPath
        }, function(){
            callback && callback();
        });
    },
    
    //开发
    dev: function (projectPath,  callback) {
        dev(projectPath,  callback);
    },

    //上传
    upload: function (projectPath, callback) {
        upload(projectPath, callback);
    },

    //打包
    pack: function (projectPath, callback) {
        pack(projectPath, callback)
    },

    //关闭任务
    close: function(projectPath){
        require("browser-sync").get(projectPath).pause();
    },

    //获取config配置项
    getConfig: function(projectPath){
        let configPath = path.join(projectPath, CONFIGNAME);
        return  requireUncached(configPath);
    },

    //初次初始化config
    initConfig: function(projectPath, callback){

        let configPath = path.join(projectPath, CONFIGNAME);
        
        if (!isFileExist(configPath)) {
            copy({
                src: CONFIGPATH,
                dest: projectPath,
            }, function(){
                callback&&callback(requireUncached(configPath));
            })
        }else{
            callback&&callback(requireUncached(configPath));
        }
    },

    //更新config 全量
    updateConfig: function (projectPath, config, callback) {

        let configPath = path.join(projectPath, CONFIGNAME);

        fs.writeFile(configPath, JSON.stringify(config, null, 4), function (err) {
            if (err) {
                throw new Error(err);
            }
            callback&&callback(requireUncached(config));
        })
    }

}

module.exports = action;

