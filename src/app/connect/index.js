
/**
 * electron 主线程和渲染之间通信
 */

const { remote, ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');
const globalStore = window.store;
const globalAction = window.action;
const globalDispatch = globalStore.dispatch;

console.log(`store=${globalStore}`)

let CONFIG = require(`${process.cwd()}/src/app/connect/config.js`)
let fhStorage = require(`${process.cwd()}/src/app/connect/storage.js`)
let STORAGE = window.STORAGE = new fhStorage(CONFIG.NAME);
let UTILS = require(`${process.cwd()}/src/app/connect/util.js`)


let {
    setProjectData, setWorkSpace,
    addProject, delProject,
    updateStatusList, updateProjectSetting, updateProxyHost, setProxyData,
    changeActionProject, changeProjectSetting
} = globalAction;

let COMMON = (function (STORAGE) {
    //初始化
    function init() {
        let storage = STORAGE.get(),
            curProjectPath,
            workSpace,
            projects;
        if (!storage) {
            storage = {};
            workSpace = path.join(remote.app.getPath(CONFIG.DEFAULT_PATH), CONFIG.WORKSPACE);
            fs.mkdir(workSpace, function (err) {
                if (err) {
                    throw new Error(err);
                }
                storage.workSpace = workSpace;
                storage.projects = {};
                STORAGE.set(storage);
                globalDispatch(setWorkSpace(workSpace));
                // 无数据展示
            });
        } else {
            checkLocalProjects();
            workSpace = storage.workSpace;
            projects = storage.projects;
            let projectsKeys = Object.keys(projects);
            if (projectsKeys.length > 0) {
                storage.curProjectPath = curProjectPath = projects[projectsKeys[0]].path;
                ipcRenderer.send('init', curProjectPath);
            } else {
                globalDispatch(setWorkSpace(workSpace));
                // 无数据展示
            }
        }
    }
    //初始化数据
    //每次启动的时候检查本地项目是否还存在
    function checkLocalProjects() {
        let storage = STORAGE.get();
        if (storage) {
            if (storage.workSpace) {
                if (!UTILS.isDirExist(storage.workSpace)) {
                    storage.projects = {};
                    console.log('本地工作区已不存在');
                }
            }
            if (storage.projects) {
                let projects = storage.projects;
                for (var key in projects) {
                    if (!UTILS.isDirExist(projects[key].path)) {
                        delete projects[key];
                    }
                }
                storage.projects = projects;
            }
            STORAGE.set(storage);
        }
    }

    return { init }
})(STORAGE);

COMMON.init();

//==接收列表

//项目初始化数据
ipcRenderer.on('getInitData-success', (event, config) => {

    let storage = STORAGE.get(),
        { workSpace, projects, curProjectPath } = storage,
        { ftp, package, server, modules, choseModules, supportChanged, supportREM, reversion } = config,
        projectArr = [],
        chooseFunc = [],
        projectPath,
        projectName;

    server.liverload && chooseFunc.push('liveReload');
    supportChanged && chooseFunc.push('fileAddCompileSupport');
    supportREM && chooseFunc.push('rem');
    reversion && chooseFunc.push('md5');

    for (var key in projects) {
        projectPath = projects[key].path;
        projectName = path.basename(projectPath);
        projectArr.push({
            key: Date.now(),
            class: 'project-floader',
            name: projectName,
            path: projectPath,
            isDeveloping: false,
            isUploading: false,
            isPackageing: false
        })
    }

    globalDispatch(setProjectData({
        data: projectArr
    }));

    globalDispatch(setWorkSpace(workSpace));

    let maxIndex = projectArr.length - 1,
        index = maxIndex >= 0 ? 0 : -1;
    globalDispatch(changeActionProject(index));
    globalDispatch(changeProjectSetting());

})

//新建项目
ipcRenderer.on('createProject-success', (event, projectPath) => {
    let storage = STORAGE.get(),
        projectName = path.basename(projectPath);
    if (!storage['projects']) {
        storage['projects'] = {};
    }
    if (!storage['projects'][projectName]) {
        storage['projects'][projectName] = {};
    }
    storage['projects'][projectName]['path'] = projectPath;
    STORAGE.set(storage);
    globalDispatch(addProject({
        class: "project-floader",
        key: Date.now(),
        name: projectName,
        path: projectPath,
        isDeveloping: false,
        isUploading: false,
        isPackageing: false
    }))
    let { projectList } = globalStore.getState(),
        { data, selectedIndex } = projectList,
        maxIndex = data.length - 1;
    globalDispatch(changeActionProject(maxIndex));
    globalDispatch(changeProjectSetting());
});

//打开项目
ipcRenderer.on('openProject', (event, projectPath) => {
    let storage = STORAGE.get(),
        projectName = path.basename(projectPath);
    if (storage && storage.workSpace) {
        if (!storage['projects']) {
            storage['projects'] = {};
        }
    }
    if (storage['projects'][projectName]) {
        console.log('项目已存在');
    } else {
        storage['projects'][projectName] = {};
        storage['projects'][projectName]['path'] = projectPath;
        STORAGE.set(storage);
        globalDispatch(addProject({
            class: "project-floader",
            key: Date.now(),
            name: projectName,
            path: projectPath,
            isDeveloping: false,
            isUploading: false,
            isPackageing: false
        }))
        let { projectList } = globalStore.getState(),
            { data, selectedIndex } = projectList,
            maxIndex = data.length - 1;
        globalDispatch(changeActionProject(maxIndex));
        globalDispatch(changeProjectSetting());
    }
});

//删除项目
ipcRenderer.on('delProject', (event) => {
    let storage = STORAGE.get();
    projectPath = storage.curProjectPath
    projectName = path.basename(projectPath);
    if (storage && storage['projects'] && storage['projects'][projectName]) {
        delete storage['projects'][projectName];
        STORAGE.set(storage);
        globalDispatch(delProject(projectName))
        let { projectList } = globalStore.getState(),
            { data, selectedIndex } = projectList,
            maxIndex = data.length - 1,
            index = maxIndex < 0 ? -1 : (selectedIndex > maxIndex ? maxIndex : selectedIndex);
        globalDispatch(changeActionProject(index));
        globalDispatch(changeProjectSetting());
    }

});

//成功获取当前激活项目，更新右侧面板
ipcRenderer.on('getSelectedProjectSetting-success', (event, config) => {
    let storage = STORAGE.get();
    let { workspace } = storage,
        { ftp, package, server, modules, choseModules, supportChanged, supportREM, reversion } = config;
    chooseFunc = [];

    server && server.liverload && chooseFunc.push('liveReload');
    supportChanged && chooseFunc.push('fileAddCompileSupport');
    supportREM && chooseFunc.push('rem');
    reversion && chooseFunc.push('md5');

    globalDispatch(updateProjectSetting({
        "workSpace": workspace,
        "choseFunctions": chooseFunc,
        "uploadHost": ftp && ftp.host,
        "uploadPort": ftp && ftp.port,
        "uploadUser": ftp && ftp.user,
        "uploadPass": ftp && ftp.pass,
        "uploadRemotePath": ftp && ftp.remotePath,
        "uploadIgnoreFileRegExp": ftp && ftp.ignoreFileRegExp,
        "uploadType": (ftp && ftp.ssh) ? 'ftp' : 'sftp',
        "packType": package && package.type,
        "packVersion": package && package.version,
        "packFileRegExp": package && package.fileRegExp,
        "modules": modules,
        "choseModules": choseModules
    }));

    globalDispatch(updateProxyHost({
        "ip": server && server.host,
        "port": server && server.port
    }));

    globalDispatch(setProxyData(server && server.proxys))
})



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

globalStore.subscribe(
    () => {
        let state = globalStore.getState(),
            action = window.preAction,
            { projectList, proxyList, actionSetting } = state,
            {
                CREATE_PROJECT_ORDER, OPEN_PROJECT_ORDER, DEl_PROJECT_ORDER,
                CHANGE_PROJECT_SETTING,
                SET_WORKSPACE, CHANGE_ACTION_PROJECT,
                CHANGE_DEV_STATUS, CHANGE_UPLOAD_STATUS, CHANGE_PACK_STATUS,
                UPDATE_PROXY_HOST,
                UPDATE_PROJECT_SETTING, ADD_PROXY_ITEM, UPDATE_PROXY_ITEM, DELETE_PROXY_ITEM, SET_PROXY_DATA,
                UPDATE_INSTALL_PROGRESS
            } = globalAction;

        let { data, selectedIndex } = projectList;

        let storage = STORAGE.get(),
            workSpace = storage && storage.workSpace || "",
            curProjectPath = storage && storage.curProjectPath || "";

        switch (action.type) {
            //创建项目
            case CREATE_PROJECT_ORDER:
                workSpace && ipcRenderer.send('CREATEPROJECT', workSpace);
                break;
            //打开项目
            case OPEN_PROJECT_ORDER:
                curProjectPath && ipcRenderer.send('OPENPROJECTPATH', curProjectPath);
                break;
            //删除项目
            case DEl_PROJECT_ORDER:
                curProjectPath && ipcRenderer.send('DElPROJECT', curProjectPath);
                break;
            //更新setting配置
            case CHANGE_PROJECT_SETTING:
                curProjectPath && ipcRenderer.send('getSelectedProjectSetting', curProjectPath);
                break;
            //更新工作空间
            case SET_WORKSPACE:
                storage.workSpace = projectList.workSpace;
                break;
            //更新当前活跃项目
            case CHANGE_ACTION_PROJECT:
                storage.curProjectPath = data[selectedIndex] && data[selectedIndex].path;
                break;
            //执行对应任务         
            case CHANGE_DEV_STATUS:
                if (!curProjectPath)
                    return;
                if (data[selectedIndex].isDeveloping) {
                    ipcRenderer.send('runTask', curProjectPath, 'dev');
                } else {
                    ipcRenderer.send('runTask', curProjectPath, 'close');
                }
                break;
            case CHANGE_UPLOAD_STATUS:
                curProjectPath && ipcRenderer.send('runTask', curProjectPath, 'upload');
                break;
            case CHANGE_PACK_STATUS:
                curProjectPath && ipcRenderer.send('runTask', curProjectPath, 'pack');
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
                let { uploadHost, uploadPort, uploadUser, uploadPass, uploadRemotePath, uploadIgnoreFileRegExp, uploadType, modules, choseModules, packType, packVersion, packFileRegExp, choseFunctions } = actionSetting.data,
                    { ip, port } = proxyList.host;
                let config = {
                    "businessName": "hero",
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
                        "version": packVersion,
                        "fileRegExp": packFileRegExp
                    }
                };
                ipcRenderer.send('updateTaskConfig', curProjectPath, config);
                break;
            //安装环境
            case UPDATE_INSTALL_PROGRESS:
                if (action.payload.index === 0)
                    ipcRenderer.send('installEnvironment');
                break;
        }

        STORAGE.set(storage);
        console.log('storage', STORAGE.get())
    }
)
