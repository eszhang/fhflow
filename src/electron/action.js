
/*
 *  electron action 动作
 */

const { app, dialog, shell, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
const { exec, execSync } = require('child_process');
const { requireUncached, isFileExist, isDirExist } = require('../task/util/index');
const task = require('../task/index');

let { webContents } = global.mainWindow;

let STORAGE = (function () {
    let cache = {
        name: "fhflow",
        workspace: "D:/mygit/fhFlow/WorkspaceTest",
        curProjectPath: "D:/mygit/fhFlowWorkspaceTest/fhflowTest",
        projects: {}
    };
    function get() {
        return cache;
    }
    function set(data) {
        cache = data;
    }
    return { set, get }
})();

let action = {

    //启动需要的数据
    init: function () {
        let storage = STORAGE.get();

        if (storage) {
            webContents.send("getInitData-success", storage);
        }

    },

    //新建项目
    createProject: function (projectPath) {

        let storage = STORAGE.get(),
            workspace;

        if (storage && (workspace = storage.workspace)) {

            projectPath = `${workspace}/test/fk-04`;

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

            task.copyProjectExample(projectPath, function () {
                console.log("create project success....")
            });

            storage.curProjectPath = projectPath;
            STORAGE.set(storage);
            webContents.send("createProject-success", projectPath);
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

            if (storage && storage.workspace) {
                if (!storage['projects']) {
                    storage['projects'] = {};
                }
            }
            if (storage['projects'][projectName]) {
                console.log('项目已存在');
            } else {
                storage.curProjectPath = projectPath;
                storage['projects'][projectName] = {};
                storage['projects'][projectName]['path'] = projectPath;
                STORAGE.set(storage);
                webContents.send("openProject-success", projectPath);
            }
        }
    },

    //删除项目
    delProject: function () {

        let storage = STORAGE.get(),
            curProjectPath = storage.curProjectPath;
        projectName = path.basename(curProjectPath);
        if (storage && storage['projects'] && storage['projects'][projectName]) {
            delete storage['projects'][projectName];
            STORAGE.set(storage);
            //关闭监听等任务(要有容错判断)
            // task.close(projectName);
            storage.curProjectPath = "";
            STORAGE.set(storage);
            webContents.send("delProject-success", projectName);
        }

    },

    //更新工作空间
    updateWorkspace: function (path) {
        let storage = STORAGE.get();
        storage.workspace = patj;
        storage.set(storage)
    },

    //更新当前活跃项目
    changeSelectedProject: function(projectPath){
        let storage = STORAGE.get();
        storage.curProjectPath = projectPath;
        STORAGE.set(storage);
    },

    //运行任务
    runTask: function (taskName) {

        let storage = STORAGE.get(),
            projectPath = storage.curProjectPath;

        if (projectPath) {
            task[taskName](projectPath, action.sendLogMessage);
        }
    },

    //关闭任务
    closeTask: function (taskName) {

    },

    //更新配置项
    updateConfig: function (config) {

        let storage = STORAGE.get(),
            projectPath = storage.curProjectPath;

        task.updateConfig(projectPath, config);
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

    },

    sendLogMessage: function(logs) {
        webContents.send("print-log", logs);
    }
};

//== 接收列表

//获取初始化数据
ipcMain.on("init", function (event) {
    action.init();
})

//更新工作空间
ipcMain.on("updateWorkspace", function (event, path) {
    action.updateWorkspace(path)
})

//更新当前活跃项目
ipcMain.on("changeSelectedProject", function (event, path) {
    action.changeSelectedProject(path)
})

//运行任务
ipcMain.on("runTask", function (event, taskName) {
    action.runTask(taskName)
})

//关闭任务
ipcMain.on("closeTask", function (event, taskName) {
    action.closeTask(taskName)
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
ipcMain.on("updateTaskConfig", function (event, config) {
    action.updateConfig(config)
})

//安装环境
ipcMain.on("installEnvironment", function (event) {
    action.installEnvironment()
})

module.exports = action;