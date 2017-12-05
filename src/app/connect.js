
/*
 *    electron 主线程和渲染之间通信
 */

const { ipcRenderer } = require('electron');

const globalStore = window.store;
const globalAction = window.action;
const globalDispatch = globalStore.dispatch;

console.log(`store=${globalStore}`)

//== 接收列表

//新建项目
ipcRenderer.on('createProject', (event, arg) => {
    console.log(arg)
});

//打开项目
ipcRenderer.on('openProject', (event, arg) => {
    console.log(arg)
});

//删除项目
ipcRenderer.on('delProject', (event, arg) => {
    console.log(arg)
});

//更新安装进程
ipcRenderer.on('installProgress', (event, step, status) => {
    globalDispatch({
        type: 'UPDATE_INSTALL_PROGRESS',
        payload: {
            index: step,
            status: status
        }
    })
});

//== 监听redux state tree 发送指令
globalStore.subscribe(
    () => {
        let state = globalStore.getState(),
            action = window.preAction,
            { UPDATE_INSTALL_PROGRESS, UPDATE_PROXY_HOST, ADD_PROXY_ITEM, UPDATE_PROXY_ITEM, DELETE_PROXY_ITEM, SET_PROXY_DATA } = globalAction;
        switch (action.type) {
            // 更新工作空间
            case "UPDATEWORKSPACE":
                ipcRenderer.send('updateWorkSpace');
                break;
            // 更新任务模块
            case "UPDATETASKMODULE":
                ipcRenderer.send('updateTaskModule');
            // 更新任务配置
            case "UPDATETASKCONFIG":
                ipcRenderer.send('updateTaskConfig');
                break;
            // 自定义任务(dev、dist、upload、pack)
            case "CUSTOMDEVTASK":
                ipcRenderer.send('customDevTask');
                break;
            case "CUSTOMDISTTASK":
                ipcRenderer.send('customDevTask');
                break;
            case "CUSTOMUPLOADTASK":
                ipcRenderer.send('customUploadTask');
                break
            case "CUSTOMPACKTASK":
                ipcRenderer.send('customPackTask');
                break
            // 更新请求代理
            case UPDATE_PROXY_HOST:
            case ADD_PROXY_ITEM:
            case UPDATE_PROXY_ITEM:
            case DELETE_PROXY_ITEM:
            case SET_PROXY_DATA:
                ipcRenderer.send('setProxy', state.proxyList);
                break;
            // 安装环境
            case UPDATE_INSTALL_PROGRESS:
                if (action.payload.index === 0)
                    ipcRenderer.send('installEnvironment');
                break;
        }
    }
)