

/**
 *  electron action 动作
 */

const fs = require('fs');
const path = require('path');
const { remote, shell } = require('electron');
const { exec, execSync } = require('child_process');
const { isFileExist, isDirExist } = require('./utils');
const task = require('../task/index');
const notifier = require('./notifier');

function createAction(globalDispatch, globalAction, STORAGE, CONFIG) {

    let {
        setProjectData, setWorkSpace,
        addProject, delProject, changeRunStatus, changeUploadStatus, changePackStatus,
        addStatusList, updateProjectSetting, updateProxyHost, setProxyData,
        changeActionProject, changeProjectSetting
    } = globalAction;

    let action = {

        //初始化
        initApp: function () {
            let storage = STORAGE.get(),
                curProjectPath,
                workSpace,
                projects,
                projectArr = [];
            if (!storage) {
                storage = {};
                workSpace = path.join(remote.app.getPath(CONFIG.DEFAULT_PATH), CONFIG.WORKSPACE);
                fs.mkdir(workSpace, function (err) {
                    if ((!err) || err.code === 'EEXIST') {
                        storage.workSpace = workSpace;
                        storage.projects = {};
                        storage.curProjectPath = "";
                        STORAGE.set(storage);
                        globalDispatch(setWorkSpace(workSpace));
                    } else {
                        notifier.showMessageError(err.message);
                        throw new Error(err);
                    }

                });
            } else {
                checkLocalProjects();
                storage = STORAGE.get();
                workSpace = storage.workSpace;
                projects = storage.projects;
                let projectsKeys = Object.keys(projects);
                if (projectsKeys.length > 0) {
                    storage.curProjectPath = curProjectPath = projects[projectsKeys[0]].path;
                    globalDispatch(setWorkSpace(workSpace));
                    for (var key in projects) {
                        projectPath = projects[key].path;
                        projectName = path.basename(projectPath);
                        projectArr.push({
                            key: Date.now(),
                            class: 'project-folder',
                            logo: 'folder',
                            name: projectName,
                            path: projectPath,
                            editable: false,
                            nowName: projectName,
                            willName: projectName,
                            isDeveloping: false,
                            isUploading: false,
                            isPackageing: false,
                            isRunning: false
                        })
                    }
                    globalDispatch(setProjectData(projectArr));
                    let maxIndex = projectArr.length - 1,
                        index = maxIndex >= 0 ? 0 : -1;
                    globalDispatch(changeActionProject(index));
                    globalDispatch(changeProjectSetting());
                } else {
                    globalDispatch(setWorkSpace(workSpace));
                }
            }

            //每次启动的时候检查本地项目是否还存在
            function checkLocalProjects() {
                let storage = STORAGE.get();
                if (storage) {
                    if (storage.workSpace) {
                        if (!isDirExist(storage.workSpace)) {
                            storage.projects = {};
                            console.log('本地工作区已不存在');
                        }
                    }
                    let projects = storage.projects;
                    if (projects) {
                        for (var key in projects) {
                            if (!isDirExist(projects[key].path)) {
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
                { workSpace } = storage,
                suffix = CONFIG.NAME + new Date().getTime(),
                projectPath = `${workSpace}\\` + suffix;

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
                    task.copyProjectExample(projectPath, function () {
                        let projectName = path.basename(projectPath);
                        if (!storage['projects']) {
                            storage['projects'] = {};
                        }
                        if (!storage['projects'][projectName]) {
                            storage['projects'][projectName] = {};
                        }
                        storage['projects'][projectName]['path'] = projectPath;
                        STORAGE.set(storage)
                        globalDispatch(addProject({
                            class: "project-folder",
                            logo: 'folder',
                            key: Date.now(),
                            name: projectName,
                            path: projectPath,
                            editable: false,
                            nowName: projectName,
                            willName: projectName,
                            isDeveloping: false,
                            isUploading: false,
                            isPackageing: false,
                            isRunning: false
                        }))
                        let { projectList } = globalStore.getState(),
                            { data, selectedIndex } = projectList,
                            maxIndex = data.length - 1;
                        globalDispatch(changeActionProject(maxIndex));
                        globalDispatch(changeProjectSetting());

                    });
                } catch (err) {
                    throw new Error(err);
                }
            }
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
                    if (storage['projects'][projectName]) {
                        notifier.showMessageError(`${projectName}该项目已存在`);
                    } else {
                        storage['projects'][projectName] = {};
                        storage['projects'][projectName]['path'] = projectPath;
                        STORAGE.set(storage);
                        globalDispatch(addProject({
                            class: "project-folder",
                            logo: "folder",
                            key: Date.now(),
                            name: projectName,
                            path: projectPath,
                            editable: false,
                            nowName: projectName,
                            willName: projectName,
                            isDeveloping: false,
                            isUploading: false,
                            isPackageing: false,
                            isRunning: false
                        }))
                        let { projectList } = globalStore.getState(),
                            { data, selectedIndex } = projectList,
                            maxIndex = data.length - 1;
                        globalDispatch(changeActionProject(maxIndex));
                        globalDispatch(changeProjectSetting());
                    }
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
            }
        },

        // 修改项目名称
        updateProjectName: function (projectList) {
            let storage = STORAGE.get()
            let newPath = projectList.data[projectList.selectedIndex].path.replace(projectList.data[projectList.selectedIndex].nowName, projectList.data[projectList.selectedIndex].willName)

            task.updateProjectName(projectList.data[projectList.selectedIndex]['path'], newPath);
            // 更新缓存
            delete storage.projects[projectList.data[projectList.selectedIndex].name]
            delete storage.curProjectPath
            var projectInfo = {
                path: newPath
            }
            storage.projects[projectList.data[projectList.selectedIndex].willName] = projectInfo
            storage.curProjectPath = newPath
            STORAGE.set(storage);

            projectList.data[projectList.selectedIndex].name = projectList.data[projectList.selectedIndex].willName
            projectList.data[projectList.selectedIndex].nowName = projectList.data[projectList.selectedIndex].willName
            globalDispatch(setProjectData(projectList.data));
            // storage.projects
        },

        //运行任务
        runTask: function (taskName, taskStatus) {
            let storage = STORAGE.get(),
                { curProjectPath } = storage,
                fn;
            if (taskName === 'dev') {
                fn = function () {
                    globalDispatch(changeRunStatus());
                }
            } else if (taskName === 'upload') {
                fn = function () {
                    globalDispatch(changeRunStatus());
                    globalDispatch(changeUploadStatus());
                }
            } else if (taskName === 'pack') {
                fn = function () {
                    globalDispatch(changeRunStatus());
                    globalDispatch(changePackStatus());
                }
            }
            task.runTask(curProjectPath, taskName, taskStatus, this.printLog, notifier, fn);
        },

        importModulesSetting: function (curProjectPath) {
            let fn = function (config) {
                globalDispatch(updateProjectSetting(config));
            }
            task.readModulesName(curProjectPath, fn);
        },

        delModulesSetting: function (curProjectPath) {
            let fn = function (config) {
                globalDispatch(updateProjectSetting(config));
            }
            task.delModulesName(curProjectPath, fn);
        },

        //获取项目配置项
        getSelectedProjectSetting: function (projectPath) {

            let storage = STORAGE.get(),
                { workSpace, curProjectPath } = storage;

            let config = task.getConfig(curProjectPath),
                { ftp, package, server, modules, choseModules, supportChanged, supportREM, reversion, businessName, projectType } = config,
                chooseFunc = [];

            server && server.liverload && chooseFunc.push('liveReload');
            supportChanged && chooseFunc.push('fileAddCompileSupport');
            supportREM && chooseFunc.push('rem');
            reversion && chooseFunc.push('md5');

            globalDispatch(updateProjectSetting({
                "businessName": businessName || "",
                "workSpace": workSpace,
                "projectType": projectType || 'normal',
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