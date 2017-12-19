
/*
 * task 对外接口
 */

const fs = require('fs');
const path = require('path');
const extract = require('./atom/extract');
const copy = require('./atom/copy');
const taskSequence = require('./sequence');
const { requireUncached, isFileExist, isDirExist, renameProject } = require('./util/index');

let { constantConfig, cacheConfig } = require('./common/index'),
    { NAME, ROOT, WORKSPACE, CONFIGNAME, CONFIGPATH, PLATFORM, DEFAULT_PAT, TEMPLAGE_PROJECT, TEMPLAGE_EXAMPLE, EXAMPLE_NAME } = constantConfig;


let action = {

    //生成脚手架
    copyProjectExample: function (projectPath, callback) {
        extract({
            src: TEMPLAGE_PROJECT,
            dest: projectPath
        }, function () {

        }, function () {
            callback && callback();
        });
    },

    //运行任务 taskStatus 1: 开启  0: 关闭
    runTask: function(projectPath, taskName, taskStatus, callback, fn ){
        let taskCloseLog = {
            dev: "[dev-task] dev模式已关闭...",
            upload: "[upload-task] upload模式已关闭...",
            pack: "[pack-task] pack模式已关闭..."
        }
        if(taskStatus){
            taskSequence[taskName](projectPath, callback, fn)
        }else{
             taskName === 'dev' && this.close(projectPath);
            //关闭
            callback({
                desc: taskCloseLog[taskName],
                type: "warning"
            })
        }
    },

    // 更新项目名称
    updateProjectName: function(oldProject, newProject){
        renameProject(oldProject, newProject)
    },

    //关闭任务
    close: function (projectPath) {
        require("browser-sync").get(projectPath).exit();
    },

    //获取config配置项
    getConfig: function (projectPath) {
        let configPath = path.join(projectPath, CONFIGNAME);
        return isFileExist(configPath) ? requireUncached(configPath) : requireUncached(CONFIGPATH);
    },

    //初次初始化config
    initConfig: function (projectPath, callback) {

        let configPath = path.join(projectPath, CONFIGNAME);

        if (!isFileExist(configPath)) {
            copy({
                src: CONFIGPATH,
                dest: projectPath,
            }, function () {
                callback && callback(requireUncached(configPath));
            })
        } else {
            callback && callback(requireUncached(configPath));
        }
    },

    //更新config 全量
    updateConfig: function (projectPath, config, callback) {

        let configPath = path.join(projectPath, CONFIGNAME);

        fs.writeFile(configPath, JSON.stringify(config, null, 4), function (err) {
            if (err) {
                throw new Error(err);
            }
            callback && callback(requireUncached(config));
        })
    }

}

module.exports = action;

