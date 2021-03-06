
/**
 * task 对外接口
 */

const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const extract = require('./atom/extract');
const copy = require('./atom/copy');
const taskRunOpt = require('./bin/run.js');
const chalk = require('./utils/chalk');

const {
    requireUncached, isFileExist, renameProject, readFistLevelFolder
} = require('./utils/file');
const {
    CONFIGNAME, CONFIGPATH, TEMPLAGE_PROJECT
} = require('./constant/config');


const action = {

    // 生成脚手架
    copyProjectExample(projectPath, callback) {
        extract({
            src: TEMPLAGE_PROJECT,
            dest: projectPath
        }, {
            end() {
                callback && callback();
            }
        });
    },

    // 运行任务 taskStatus 1: 开启  0: 关闭
    runTask(projectPath, taskName, taskStatus, loggerhandler, fn) {
        if (taskStatus) {
            taskRunOpt[taskName](projectPath, loggerhandler, fn);
        } else if (taskName === 'dev') {
            this.close(projectPath);
            loggerhandler(`${chalk.yellow('☷')}  dev mode closed`);
        }
    },

    // 更新项目名称
    updateProjectName(oldProject, newProject) {
        renameProject(oldProject, newProject);
    },

    // 读取项目名称
    readModulesName(curProjectPath, fn) {
        const config = this.getConfig(curProjectPath);
        const basePath = `${curProjectPath}\\src\\view`;
        const businessName = readFistLevelFolder(basePath)[0];
        // 为了防止有的文件夹模块不全
        const arrayPath = [`${curProjectPath}\\src\\view\\${businessName}`, `${curProjectPath}\\src\\tpl\\${businessName}`,
            `${curProjectPath}\\src\\scss\\${businessName}`, `${curProjectPath}\\src\\js\\${businessName}`,
            `${curProjectPath}\\src\\images\\${businessName}`, `${curProjectPath}\\src\\fonts\\${businessName}`];

        let modules = [];
        for (let i = 0; i < arrayPath.length; i++) {
            const eachModule = readFistLevelFolder(arrayPath[i]);
            modules = _.union(modules, eachModule);
        }

        config.businessName = businessName;
        config.modules = modules;
        config.choseModules = modules;
        this.updateConfig(curProjectPath, config);
        fn(config);
    },

    // 删除项目名称
    delModulesName(curProjectPath, fn) {
        const config = this.getConfig(curProjectPath);

        config.businessName = '';
        config.modules = [];
        config.choseModules = [];
        this.updateConfig(curProjectPath, config);
        fn(config);
    },

    // 关闭任务
    close(projectPath) {
        require('browser-sync').get(projectPath).exit();
        require('./atom/cache')[projectPath].close();
    },

    // 获取config配置项
    getConfig(projectPath) {
        const configPath = path.join(projectPath, CONFIGNAME);
        return isFileExist(configPath) ? requireUncached(configPath) : requireUncached(CONFIGPATH);
    },

    // 初次初始化config
    initConfig(projectPath, callback) {
        const configPath = path.join(projectPath, CONFIGNAME);

        if (!isFileExist(configPath)) {
            copy({
                src: CONFIGPATH,
                dest: projectPath
            }, () => {
                callback && callback(requireUncached(configPath));
            });
        } else {
            callback && callback(requireUncached(configPath));
        }
    },

    // 更新config 全量
    updateConfig(projectPath, config, callback) {
        const configPath = path.join(projectPath, CONFIGNAME);
        const configContent = JSON.stringify(config, null, 4);
        try {
            fs.writeFileSync(configPath, configContent);
            callback && callback(requireUncached(config));
        } catch (e) {
            throw new Error(e);
        }
    }

};

module.exports = action;

