
/*
 *  electron action 动作
 */

const { app, dialog, shell, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
const { exec, execSync } = require('child_process');
const { requireUncached, isFileExist, isDirExist } = require('../task/util/index');
const task = require('../task/index');

let mainWindow = global.mainWindow,
    webContents = mainWindow.webContents;

let STORAGE = (function(){
    let cache = {
        name: "fhflow",
        workspace: "E:/eszhang-git/fhflow",
        projects: {}
    };
    function get(data) {
        cache = data;
    }
    function set(){
        return cache;
    }
    return { set, get }
})();

let action = {

    //新建项目
    createProject: function (projectPath) {

        let storge = STORAGE.get(),
            workspace;

        if(storge&&(workspace=storge.workspace)){
            
            projectPath = `${workspace}/fk-03`;

            //先判断一下工作区是否存在
            if (!isDirExist(workspace)) {
                try {
                    fs.mkdirSync(path.join(workspace));
                } catch (err) {
                    throw new Error(err);
                }
            }
            //创建项目目录
            if (isDirExist(projectPath)) {
                throw new Error('project already exists');
            } else {
                try {
                    fs.mkdirSync(path.join(projectPath));
                } catch (err) {
                    throw new Error(err);
                }
            }

            task.copyProjectExample(projectPath, function(){
                console.log("create project success....")
            });

            webContents.send("createProject", projectPath);
        }
    },

    //打开项目
    openProject: function () {
 
        let projectPaths = dialog.showOpenDialog({
            properties: ['openDirectory']
        }),
        projectPath;

        if (projectPaths && projectPaths.length) {

            projectPath = projectPaths[0];

            let storage = STORAGE.get(),
                projectName = path.basename(projectPath);
            
            if(storage&&storage.workspace){
                if (!storage['projects']) {
                    storage['projects'] = {};
                }
            }
            if (storage['projects'][projectName]) {
                console.log('项目已存在');
            }else{
                storage['projects'][projectName] = {};
                storage['projects'][projectName]['path'] = projectPath;
                STORAGE.set(projectName);
                webContents.send("openProject", projectPath);
            }           
        }
    },

    //删除项目
    delProject: function (projectName) {
        
        let storage = STORAGE.get();

        if (storage && storage['projects'] && storage['projects'][projectName]) {
            delete storage['projects'][projectName];
            STORAGE.set(storage);
        }

        //关闭监听等任务
   
        webContents.send("delProject", projectName);
    },

    //运行任务
    runTask: function (projectPath, taskName) {
        task[taskName](projectPath);
    },

    //检查更新
    checkUpdate: function () {
        console.log('check update ...')
    },

    //查看官网主页
    viewHomeWebsite: function () {
        shell.openExternal('https://github.com/eszhang');
    },

    //使用帮助
    useHelp: function () {
        shell.openExternal('https://github.com/eszhang');
    },

    //报告问题
    reportProblems: function () {
        shell.openExternal('https://github.com/eszhang');
    },

    //关于
    showAbout: function () {
        shell.openExternal('https://github.com/eszhang');
    },

    //安装环境
    installEnvironment: function () {

        exec(`"src/electron/bat/node-install.bat" ${process.cwd()}/dev-environment`, {
            cwd: process.cwd()
        }, function (err, stdout, stderr) {
            if (err || stdout.indexOf("i-error") !== -1) {
                webContents.send("installProgress", 1, 0);
            } else {
                webContents.send("installProgress", 1, 0);
                exec(`"src/electron/bat/compass-install.bat" ${process.cwd()}/dev-environment`, {
                    cwd: process.cwd()
                }, function (err, stdout, stderr) {
                    if (err || stdout.indexOf("i-error") !== -1) {
                        webContents.send("installProgress", 2, 1);
                    } else {
                        webContents.send("installProgress", 2, 0);

                        setTimeout(function () {
                            webContents.send("installProgress", 3, 0);
                        }, 1000)
                    }
                })
            }
        });

    }
};

//== 接收列表

//运行任务
ipcMain.on("runTask", function (event, taskName) {
    action.runTask(taskName)
})

//更新任务配置项
ipcMain.on("updateTaskConfig", function (event, config) {
    action.updateConfig(config)
})

//安装环境
ipcMain.on("installEnvironment", function (event) { 
    action.installEnvironment()
})

module.exports = action;