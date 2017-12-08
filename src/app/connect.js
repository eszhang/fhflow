
/**
 * electron 主线程和渲染之间通信
 */

const { ipcRenderer } = require('electron');
const path = require('path');
const globalStore = window.store;
const globalAction = window.action;
const globalDispatch = globalStore.dispatch;

console.log(`store=${globalStore}`)

//==接收列表

let { addProject, delProject, updateStatusList } = globalAction;

//项目初始化数据
ipcRenderer.on('getInitData-success', (event, storage) => {
    console.log(storage)
})

//新建项目
ipcRenderer.on('createProject-success', (event, projectPath) => {
    let projectName = path.basename(projectPath);
    globalDispatch(addProject({
        class: "project-floader",
        key: Date.now(),
        name: projectName,
        path: projectPath
    }))
});

//打开项目
ipcRenderer.on('openProject-success', (event, projectPath) => {
    let projectName = path.basename(projectPath);
    globalDispatch(addProject({
        class: "project-floader",
        key: Date.now(),
        name: projectName,
        path: projectPath
    }))
});

//删除项目
ipcRenderer.on('delProject-success', (event, projectPath) => {
    let projectName = path.basename(projectPath);
    globalDispatch(delProject({
        index: 0
    }))
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

//控制台信息
let logs = [];
ipcRenderer.on('print-log', (event, newLogs) => {
    newLogs = Array.isArray(newLogs) ? newLogs : [newLogs];
    newLogs = newLogs.map(function (log, logIndex) {
        let D = new Date(),
            h = D.getHours(),
            m = D.getMinutes(),
            s = D.getSeconds();
        h = h - 0 < 10 ? `0${h}` : h;
        m = m - 0 < 10 ? `0${m}` : m;
        s = s - 0 < 10 ? `0${s}` : s;

        return Object.assign({}, log, {
            desc: `[${h}:${m}:${s}] ${log.desc}`
        });
    })
    logs = [...logs, ...newLogs];
    console.log(logs)
    globalDispatch(updateStatusList(logs))
});

//==监听redux state tree 发送指令 至 electron main 线程

ipcRenderer.send('init');

globalStore.subscribe(
    () => {
        let state = globalStore.getState(),
            action = window.preAction,
            { proxyList } = state,
            { CHANGE_ACTION_PROJECT, UPDATE_INSTALL_PROGRESS, UPDATE_PROXY_HOST, ADD_PROXY_ITEM, UPDATE_PROXY_ITEM, DELETE_PROXY_ITEM, SET_PROXY_DATA } = globalAction;
        switch (action.type) {
            //创建项目
            case "CREATEPROJECT":
                ipcRenderer.send('CREATEPROJECT');
                break;
            //打开项目
            case "DElPROJECT":
                ipcRenderer.send('OPENPROJECT');
                break;
            //删除项目
            case "DElPROJECT":
                ipcRenderer.send('DElPROJECT');
                break;
            //更新工作空间
            case "UPDATEWORKSPACE":
                ipcRenderer.send('updateWorkspace');
                break;
            //更新当前活跃项目
            case CHANGE_ACTION_PROJECT:
                ipcRenderer.send('changeSelectedProject');
                break;
            //执行对应任务         
            case "CHANGETASK":
                let taskName = "dev";
                ipcRenderer.send('runTask', taskName);
                break;
            //自定义任务(dev、dupload、pack)
            case "CUSTOMDEVTASK":
                ipcRenderer.send('customDevTask');
                break;
            case "CUSTOMUPLOADTASK":
                ipcRenderer.send('customUploadTask');
                break
            case "CUSTOMPACKTASK":
                ipcRenderer.send('customPackTask');
                break
            //更新任务配置
            case "UPDATETASKMODULE":
            case "UPDATETASKCONFIG":
            case UPDATE_PROXY_HOST:
            case ADD_PROXY_ITEM:
            case UPDATE_PROXY_ITEM:
            case DELETE_PROXY_ITEM:
            case SET_PROXY_DATA:
                let config = {
                    "supportREM": true,
                    "supportChanged": false,
                    "reversion": false,
                    "modules": [],
                    "businessName": "hero",
                    "server": {
                        "host": proxyList.host.ip,
                        "port": proxyList.host.port,
                        "liverload": true,
                        "proxys": []
                    },
                    "ftp": {
                        "host": "",
                        "port": "",
                        "user": "",
                        "pass": "",
                        "remotePath": "",
                        "ignoreFileRegExp": "",
                        "ssh": false
                    },
                    "package": {
                        "type": "zip",
                        "version": "0.0.1",
                        "fileRegExp": "${name}-${moduleName}-${version}-${time}"
                    }
                };
                ipcRenderer.send('updateTaskConfig', config);
                break;
            //安装环境
            case UPDATE_INSTALL_PROGRESS:
                if (action.payload.index === 0)
                    ipcRenderer.send('installEnvironment');
                break;
        }
    }
)