/**
 *  electron action 动作
 */


let { webContents } = global.mainWindow;

let action = {

    //新建项目
    createProject: function () {
        webContents.send("createProject");
    },

    //打开项目
    openProject: function () {
        webContents.send("openProject");
    },

    //删除项目
    delProject: function () {
        webContents.send("delProject");
    },

    //运行任务
    runTask: function (taskName) {
        webContents.send("runTask", taskName);
    },

    //检查更新
    checkUpdate: function () {
        webContents.send("checkUpdate", urlName);
    },

    //打开外链
    openExternal: function (urlName) {
        webContents.send("openExternal", urlName);
    }

}

module.exports = action