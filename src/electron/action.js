
/*
 *  electron action 动作
 */

const { app, dialog, shell, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const { exec, execSync } = require('child_process');
const { requireUncached, isFileExist, isDirExist } = require('../task/util/index');
const task = require('../task/index');

let { webContents } = global.mainWindow;

let action = {

    //新建项目
    createProject: function (workSpace) {

        if (!workSpace) {
            webContents.send("workSpace-requeset");
            return;
        }
        let randomName = 'fhflow' + new Date().getTime(),
            projectPath = `${workSpace}/` + randomName;

        //先判断一下工作区是否存在
        if (!isDirExist(workSpace)) {
            try {
                fs.mkdirSync(path.join(workSpace));
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

        task.copyProjectExample(projectPath, function () {
            webContents.send("createProject-success", projectPath);
            console.log("create project success....")
        });

    },

    //打开项目
    openProject: function () {

        let projectPaths = dialog.showOpenDialog({
            properties: ['openDirectory']
        }),
            projectPath;

        if (projectPaths && projectPaths.length) {

            projectPath = projectPaths[0];

            webContents.send("openProject", projectPath);
        }
    },

    //删除项目
    delProject: function (projectPath) {

        //关闭监听等任务(要有容错判断)
        task.close(projectPath);
        webContents.send("delProject-success");
    },

    //获取项目配置项
    getSelectedProjectSetting: function (projectPath) {

        let config = task.getConfig(projectPath);

        webContents.send("getSelectedProjectSetting-success", config);

    },

    //打开工作目录
    openProjectPath: function (projectPath) {
        shell.openItem(projectPath);
    },

    //运行任务 taskStatus 1: 开启  0: 关闭
    runTask: function (projectPath, taskName, taskStatus) {
        task.runTask(projectPath, taskName, taskStatus, this.sendLogMessage);
    },

    //更新配置项
    updateConfig: function (projectPath, config) {

        task.updateConfig(projectPath, config);
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
        })
    },

    //发送日志
    sendLogMessage: function (logs) {
        webContents.send("print-log", logs);
    },

    //检查更新
    checkUpdate: function () {
        console.log('check update ...');
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
    }
};

//== 注册接收渲染线程信息列表

//创建项目
ipcMain.on("createProject", function (event, workspace) {
    action.createProject(workspace)
})
ipcMain.on("workSpace-response", function (event, workSpace) {
    action.createProject(workSpace)
})

//打开项目路径
ipcMain.on("openProjectPath", function (event, projectPath) {
    action.openProjectPath(projectPath)
})

//删除项目
ipcMain.on("delProject", function (event, projectPath) {
    action.delProject(projectPath)
})

//获取当前激活项目的setting
ipcMain.on("getSelectedProjectSetting", function (event, curProjectPath) {
    action.getSelectedProjectSetting(curProjectPath)
})

//更新当前活跃项目
ipcMain.on("changeSelectedProject", function (event, path) {
    action.changeSelectedProject(path)
})

//运行任务
ipcMain.on("runTask", function (event, projectPath, taskName, taskStatus) {
    action.runTask(projectPath, taskName, taskStatus)
})

//自定义dev任务
ipcMain.on("customDevTask", function (event, taskTest) {

})

//自定义upload任务
ipcMain.on("customUploadTask", function (event, taskTest) {

})

//自定义pack任务
ipcMain.on("customPackTask", function (event, taskTest) {

})

//更新任务配置项
ipcMain.on("updateTaskConfig", function (event, projectPath, config) {
    action.updateConfig(projectPath, config)
})

//安装环境
ipcMain.on("installEnvironment", function (event) {
    action.installEnvironment()
})

module.exports = action;