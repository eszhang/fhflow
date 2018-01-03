
/**
 * electron 主线程和渲染之间通信
 */

const { remote, ipcRenderer, shell } = require('electron');
const fs = require('fs');
const path = require('path');
const globalStore = window.fhStore;
const globalAction = window.fhAction;
const globalDispatch = globalStore.dispatch;

let BASEPATH = process.cwd() + '/src/connect';
let CONFIG = require(`${BASEPATH}/config.js`);
let STORAGE = require(`${BASEPATH}/storage.js`);
let ACTION = require(`${BASEPATH}/action.js`)(globalDispatch, globalAction, STORAGE, CONFIG);

console.log(`store=${globalStore}`)

//==接收主线程指令

//新建项目
ipcRenderer.on('createProject', (event) => {
    ACTION.createProject()
});

//打开项目
ipcRenderer.on('openProject', (event) => {
    ACTION.openProject()
});

//删除项目
ipcRenderer.on('delProject', (event) => {
    ACTION.delProject()
});

//运行任务
ipcRenderer.on('runTask', (event, taskName) => {
    ACTION.runTask(taskName)
});

//检查更新
ipcRenderer.on('checkUpdate', (event) => {
    ACTION.checkUpdate()
});

//打开外链
ipcRenderer.on('openExternal', (event, urlName) => {
    ACTION.openExternal(urlName)
});
;

//==监听 app redux state tree 执行对应指令

globalStore.subscribe(
    () => {
        let state = globalStore.getState(),
            action = window.fhPrevAction,
            { projectList, proxyList, actionSetting } = state,
            {
                CREATE_PROJECT_ORDER, OPEN_PROJECT_ORDER, DEl_PROJECT_ORDER,
                CHANGE_PROJECT_SETTING,
                SET_WORKSPACE, CHANGE_PROJECT_SELECTED,
                CHANGE_DEV_STATUS, CHANGE_UPLOAD_STATUS, CHANGE_PACK_STATUS, IMPORT_MODULES, DEL_MODULES,
                UPDATE_PROXY_HOST, UPDATE_PROJECT_NAME,
                UPDATE_PROJECT_SETTING, ADD_PROXY_ITEM, UPDATE_PROXY_ITEM, DEL_PROXY_ITEM, SET_PROXY_DATA,
                OPEN_LINK,
                UPDATE_INSTALL_PROGRESS
            } = globalAction;

        let { data, selectedIndex } = projectList;

        let storage = STORAGE.get(),
            workSpace = storage && storage.workSpace || "",
            curProjectPath = storage && storage.curProjectPath || "",
            taskFlag;

        switch (action.type) {
            //创建项目
            case CREATE_PROJECT_ORDER:
                ACTION.createProject();
                break;
            //打开项目
            case OPEN_PROJECT_ORDER:
                ACTION.openProjectPath();
                break;
            //删除项目
            case DEl_PROJECT_ORDER:
                ACTION.delProject();
                break;
            // 更新项目名称
            case UPDATE_PROJECT_NAME:
                ACTION.updateProjectName(projectList);
                break;
            //更新setting配置展示
            case CHANGE_PROJECT_SETTING:
                ACTION.getSelectedProjectSetting();
                break;
            //导入模块化设置
            case IMPORT_MODULES:
                try{
                    ACTION.importModulesSetting(curProjectPath);
                }catch(e){
                    let msg = ''
                    if(e.message.indexOf('not a directory')){
                        msg = '本项目不符合模块化项目格式';
                    }
                    ACTION.notify(msg)
                }
                break;
            //删除模块化设置
            case DEL_MODULES:
                ACTION.delModulesSetting(curProjectPath);
                break;
            //更新工作空间
            case SET_WORKSPACE:
                storage.workSpace = projectList.workSpace;
                STORAGE.set(storage);
                break;
            //更新当前活跃项目
            case CHANGE_PROJECT_SELECTED:
                storage.curProjectPath = (data && data[selectedIndex] && data[selectedIndex].path) || storage.curProjectPath;
                STORAGE.set(storage);
                break;
            //执行对应任务         
            case CHANGE_DEV_STATUS:
                taskFlag = data[selectedIndex].isDeveloping ? 1 : 0;
                ACTION.runTask('dev', taskFlag);
                break;
            case CHANGE_UPLOAD_STATUS:
                taskFlag = data[selectedIndex].isUploading ? 1 : 0;
                ACTION.runTask('upload', taskFlag);
                break;
            case CHANGE_PACK_STATUS:
                taskFlag = data[selectedIndex].isPackageing ? 1 : 0;
                ACTION.runTask('pack', taskFlag);
                break;
            //自定义任务(dev、dupload、pack)
            case "CUSTOMDEVTASK":
                break;
            case "CUSTOMUPLOADTASK":
                break
            case "CUSTOMPACKTASK":
                break
            //更新任务配置
            case UPDATE_PROJECT_SETTING:
            case UPDATE_PROXY_HOST:
            case ADD_PROXY_ITEM:
            case UPDATE_PROXY_ITEM:
            case DEL_PROXY_ITEM:
            case SET_PROXY_DATA:
                let { uploadHost, uploadPort, uploadUser, uploadPass, uploadRemotePath, uploadIgnoreFileRegExp, uploadType, modules, choseModules, packType, packVersion, packFileRegExp, choseFunctions, projectType } = actionSetting.data,
                    { ip, port } = proxyList.host;
                let config = {
                    "businessName": actionSetting.data.businessName || "",
                    "modules": modules,
                    "choseModules": choseModules,
                    "projectType": projectType || 'normal',
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
                        "port": uploadPort || '22',
                        "user": uploadUser,
                        "pass": uploadPass,
                        "remotePath": uploadRemotePath || '/',
                        "ignoreFileRegExp": uploadIgnoreFileRegExp,
                        "ssh": uploadType === "ftp" ? true : false
                    },
                    "package": {
                        "type": packType,
                        "version": packVersion,
                        "fileRegExp": packFileRegExp
                    }
                };
                ACTION.updateConfig(config);
                break;
            case OPEN_LINK:
                ACTION.openDoc(action.payload.link)
                break;
            //安装环境
            case UPDATE_INSTALL_PROGRESS:
                if (action.payload.index === 0)
                    ACTION.installEnvironment();
                break;
        }

        // STORAGE.set(storage);
        console.log('storage', STORAGE.get())
    }
)

ACTION.initApp();

