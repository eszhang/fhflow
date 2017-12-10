
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

let { setProjectData, addProject, delProject, updateStatusList, updateProjectSetting, updateProxyHost, setProxyData } = globalAction;

//项目初始化数据
ipcRenderer.on('getInitData-success', (event, storage, config) => {

    let { workspace, projects } = storage,
        { ftp, package, server, modules, choseModules, supportChanged, supportREM, reversion } = config,
        chooseFunc = [];

    server.liverload && chooseFunc.push('liveReload');
    supportChanged && chooseFunc.push('fileAddCompileSupport');
    supportREM && chooseFunc.push('rem');
    reversion && chooseFunc.push('md5');

    globalDispatch(setProjectData({
        data: [
            {
                key: 0,
                class: 'project-floader',
                name: 'ued0',
                path: 'E://test/ued0',
                isDeveloping: false,
                isUploading: false,
                isPackageing: false
            }, {
                key: 1,
                class: 'project-floader',
                name: 'ued1',
                path: 'E://test/ued1',
                isDeveloping: false,
                isUploading: false,
                isPackageing: false
            }, {
                key: 2,
                class: 'project-floader',
                name: 'ued2',
                path: 'E://test/ued2',
                isDeveloping: false,
                isUploading: false,
                isPackageing: false
            }
        ]
    }));

    globalDispatch(updateProjectSetting({
        "workSpace": workspace,
        "choseFunctions": chooseFunc,
        "uploadHost": ftp.host,
        "uploadPort": ftp.port,
        "uploadUser": ftp.user,
        "uploadPass": ftp.pass,
        "uploadRemotePath": ftp.remotePath,
        "uploadIgnoreFileRegExp": ftp.ignoreFileRegExp,
        "uploadType": ftp.ssh ? 'sftp' : 'ftp',
        "packType": package.type,
        "PackVersion": package.version,
        "packFileRegExp": package.fileRegExp,
        "modules": modules,
        "choseModules": choseModules
    }));

    globalDispatch(updateProxyHost({
        "ip": server.host,
        "port": server.port
    }));

    globalDispatch(setProxyData(server.proxys))


})

//新建项目
ipcRenderer.on('createProject-success', (event, projectPath) => {
    let projectName = path.basename(projectPath);
    globalDispatch(addProject({
        class: "project-floader",
        key: Date.now(),
        name: projectName,
        path: projectPath,
        isDeveloping: false,
        isUploading: false,
        isPackageing: false
    }))
});

//打开项目
ipcRenderer.on('openProject-success', (event, projectPath) => {
    let projectName = path.basename(projectPath);
    globalDispatch(addProject({
        class: "project-floader",
        key: Date.now(),
        name: projectName,
        path: projectPath,
        isDeveloping: false,
        isUploading: false,
        isPackageing: false
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
            { proxyList, actionSetting } = state,
            { CHANGE_ACTION_PROJECT, UPDATE_INSTALL_PROGRESS, UPDATE_PROXY_HOST, ADD_PROXY_ITEM, UPDATE_PROXY_ITEM, DELETE_PROXY_ITEM, SET_PROXY_DATA, UPDATE_PROJECT_SETTING } = globalAction;
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
            case UPDATE_PROJECT_SETTING:
            case UPDATE_PROXY_HOST:
            case ADD_PROXY_ITEM:
            case UPDATE_PROXY_ITEM:
            case DELETE_PROXY_ITEM:
            case SET_PROXY_DATA:
                let { uploadHost, uploadPort, uploadUser, uploadPass, uploadRemotePath, uploadIgnoreFileRegExp, uploadType, modules, choseModules, packType, PackVersion, packFileRegExp, choseFunctions } = actionSetting.data,
                    { ip, port } = proxyList.host;
                let config = {
                    "businessName": "hero2",
                    "modules": modules,
                    "choseModules": choseModules,
                    "supportREM": choseFunctions.indexOf("rem") !== -1 ? true : false,
                    "supportChanged": choseFunctions.indexOf("fileAddCompileSupport") !== -1 ? true : false,
                    "reversion": choseFunctions.indexOf("md5") !== -1 ? true : false,
                    "server": {
                        "host": ip,
                        "port": port,
                        "liverload": choseFunctions.indexOf("liveReload") !== -1 ? true : false,
                        "proxys": proxyList.data
                    },
                    "ftp": {
                        "host": uploadHost,
                        "port": uploadPort,
                        "user": uploadUser,
                        "pass": uploadPass,
                        "remotePath": uploadRemotePath,
                        "ignoreFileRegExp": uploadIgnoreFileRegExp,
                        "ssh": uploadType === "ftp" ? true : false
                    },
                    "package": {
                        "type": packType,
                        "version": PackVersion,
                        "fileRegExp": packFileRegExp
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