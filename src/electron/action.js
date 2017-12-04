
/*
 *  electron action 动作
 */

const { app, dialog, shell, ipcMain } = require('electron');
const { exec } = require('child_process');
const task = require('../task/index');

let mainWindow = global.mainWindow,
    webContents = mainWindow.webContents;

    exec('E:/eszhang-git/fhflow/src/electron/test.bat',function(err, stdout, stderr){
            console.log('the current working dir is : ',stdout)
        }
    );
    
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
    },

    //更新请求代理
    setProxy: function(config){

    },

    //安装环境
    installEnvironment: function(){

        setTimeout(function(){
            webContents.send("installProgress",1);
        },3000)
        setTimeout(function(){
            webContents.send("installProgress",2);
        },3000)
        setTimeout(function(){
            webContents.send("installProgress",3);
        },5000)
        setTimeout(function(){
            webContents.send("installProgress",4);
        },6000)
    }
};

//== 接收列表

//运行任务
ipcMain.on("runTask", function(event, taskName){
    action.runTask(taskName)
})

//更新请求代理
ipcMain.on("setProxy", function(event,config){
    action.setProxy(config)
})

//安装环境
ipcMain.on("installEnvironment", function(event){
    console.log("开始安装...")
    action.installEnvironment()
})




module.exports = action;