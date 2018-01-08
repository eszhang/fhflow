
/**
 *  electron action 动作
 */


const { webContents } = global.mainWindow;

const action = {

    // 新建项目
    createProject() {
        webContents.send('createProject');
    },

    // 打开项目
    openProject() {
        webContents.send('openProject');
    },

    // 删除项目
    delProject() {
        webContents.send('delProject');
    },

    // 运行任务
    runTask(taskName) {
        webContents.send('runTask', taskName);
    },

    // 检查更新
    checkUpdate() {
        webContents.send('checkUpdate');
    },

    // 打开外链
    openExternal(urlName) {
        webContents.send('openExternal', urlName);
    }

};

module.exports = action;
