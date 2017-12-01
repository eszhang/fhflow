
/*
 *  electron action 动作
 */

const { app, dialog, shell } = require('electron');
const task = require('../task/index');

let mainWindow = global.mainWindow,
    webContents = mainWindow.webContents;

let action = {

    //新建项目
    createProject: function () {
        webContents.send("createProject");
    },

    //打开项目
    openProject: function () {
        let projectPath = dialog.showOpenDialog({
            properties: ['openDirectory']
        });
        if (projectPath && projectPath.length) {
            webContents.send("openProject",projectPath[0]);
        }
    },

    //删除项目
    delProject: function () {
        let projectPath = "";
        webContents.send("delProject",projectPath);
    },

    // 运行任务
    runTask: function (taskName) {
        let projectPath = "";
        task[taskName](projectPath, logHander);
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
    }
}

module.exports = action;