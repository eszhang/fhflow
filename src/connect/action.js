/**
 *  electron action 动作
 */

const { remote, shell } = require('electron');
const fs = require('fs');
const path = require('path');
const { exec, execSync } = require('child_process');
const { requireUncached, isFileExist, isDirExist } = require(path.join(__dirname, '../task/util/index'));
const UTILS = require(path.join(__dirname, 'utils.js'));
const task = require(path.join(__dirname, '../task/index'));
function createAction(globalDispatch, globalAction, STORAGE, CONFIG) {

    let {
        setProjectData, setWorkSpace,
        addProject, delProject,
        addStatusList, updateProjectSetting, updateProxyHost, setProxyData,
        changeActionProject, changeProjectSetting
    } = globalAction;

    let action = {

        //初始化
        initApp: function () {
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
                });
            } else {
                checkLocalProjects();
                workSpace = storage.workSpace;
                projects = storage.projects;
                let projectsKeys = Object.keys(projects);
                if (projectsKeys.length > 0) {
                    storage.curProjectPath = curProjectPath = projects[projectsKeys[0]].path;
                    globalDispatch(setWorkSpace(workSpace));
                    initData();
                } else {
                    globalDispatch(setWorkSpace(workSpace));
                }
            }

            //初始化数据
            function initData() {
                let storage = STORAGE.get(),
                    { projects } = storage,
                    projectArr = [];

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
                globalDispatch(setProjectData(projectArr));
                let maxIndex = projectArr.length - 1,
                    index = maxIndex >= 0 ? 0 : -1;
                globalDispatch(changeActionProject(index));
                globalDispatch(changeProjectSetting());
            }

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
        },

        //新建项目
        createProject: function () {

            let storage = STORAGE.get(),
                { workSpac } = storage,
                suffix = CONFIG.NAME + new Date().getTime(),
                projectPath = `${workSpace}/` + suffix;

            //先判断一下工作区是否存在
            if (!isDirExist(workSpace)) {
                try {
                    fs.mkdirSync(path.join(workSpace));
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

                let storage = STORAGE.get(),
                    projectName = path.basename(projectPath);

                if (!storage['projects']) {
                    storage['projects'] = {};
                }
                if (!storage['projects'][projectName]) {
                    storage['projects'][projectName] = {};
                }
                storage['projects'][projectName]['path'] = projectPath;
                STORAGE.set(storage)
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
        },

        //打开项目
        openProject: function (callback) {

            let storage = STORAGE.get(),
                projectPaths = remote.dialog.showOpenDialog({
                    properties: ['openDirectory']
                }),
                projectPath,
                projectName;

            if (projectPaths && projectPaths.length) {

                projectPath = projectPaths[0];
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
            }
        },

        //打开工作目录
        openProjectPath: function () {
            let storage = STORAGE.get(),
                curProjectPath = storage && storage.curProjectPath;
            if (curProjectPath) {
                shell.openItem(curProjectPath);
            }
        },

        //删除项目
        delProject: function () {
            let storage = STORAGE.get(),
                { curProjectPath } = storage,
                projectName = path.basename(curProjectPath);
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
                // new Notification('FHFLOW提示', {
                //     body: '删除成功'
                // });
            }
        },

        //运行任务
        runTask: function (taskName, taskStatus) {
            let storage = STORAGE.get(),
                { curProjectPath } = storage;
            task.runTask(curProjectPath, taskName, taskStatus, this.printLog);
        },

        //获取项目配置项
        getSelectedProjectSetting: function (projectPath) {

            let storage = STORAGE.get(),
                { workspace, curProjectPath } = storage;

            let config = task.getConfig(curProjectPath),
                { ftp, package, server, modules, choseModules, supportChanged, supportREM, reversion } = config,
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

        },

        //更新配置项
        updateConfig: function (config) {
            let storage = STORAGE.get(),
                { curProjectPath } = storage;
            task.updateConfig(curProjectPath, config);
        },

        //安装环境
        installEnvironment: function () {

            exec(`${__dirname}/bat/node-install.bat ${path.join(__dirname, "../../dev-environment")}`, function (err, stdout, stderr) {
                if (err || stdout.indexOf("i-error") !== -1) {
                    globalDispatch({
                        type: 'UPDATE_INSTALL_PROGRESS',
                        payload: {
                            index: 1,
                            status: 1
                        }
                    })
                } else {
                    globalDispatch({
                        type: 'UPDATE_INSTALL_PROGRESS',
                        payload: {
                            index: 1,
                            status: 0
                        }
                    })
                    exec(`${__dirname}/bat/compass-install.bat ${path.join(__dirname, "../../dev-environment")}`, function (err, stdout, stderr) {
                        if (err || stdout.indexOf("i-error") !== -1) {
                            globalDispatch({
                                type: 'UPDATE_INSTALL_PROGRESS',
                                payload: {
                                    index: 2,
                                    status: 1
                                }
                            })
                        } else {
                            globalDispatch({
                                type: 'UPDATE_INSTALL_PROGRESS',
                                payload: {
                                    index: 2,
                                    status: 0
                                }
                            })
                            setTimeout(function () {
                                globalDispatch({
                                    type: 'UPDATE_INSTALL_PROGRESS',
                                    payload: {
                                        index: 3,
                                        status: 0
                                    }
                                })
                            }, 1000)
                        }
                    })
                }
            })
        },

        //打印输出信息
        printLog: function (logs) {
            logs = Array.isArray(logs) ? logs : [logs];
            logs = logs.map(function (log, logIndex) {
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
            globalDispatch(addStatusList(logs))
        },

        //检查更新
        checkUpdate: function () {
            console.log("敬请期待...")
        },

        //打开外链
        openExternal: function (urlName) {
            let urlMap = {
                home: 'https://github.com/eszhang',
                help: 'https://github.com/eszhang',
                problem: 'https://github.com/eszhang',
                about: 'https://github.com/eszhang'
            };
            shell.openExternal(urlMap[urlName])
        }

    }

    return action;
}

module.exports = createAction