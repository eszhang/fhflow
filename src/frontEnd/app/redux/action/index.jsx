
/**
 * action 与 actionCreator
 */

/*
 * action类型
 */
export const CHANGE_MENU_SELECTED = 'CHANGE_MENU_SELECTED';
export const SET_WORKSPACE = 'SET_WORKSPACE';
export const ADD_PROJECT_ITEM = 'ADD_PROJECT_ITEM';
export const DEL_PROJECT_ITEM = 'DEL_PROJECT_ITEM';
export const SET_PROJECT_DATA = 'SET_PROJECT_DATA';
export const CHANGE_PROJECT_SELECTED = 'CHANGE_PROJECT_SELECTED';
export const CHANGE_DEV_STATUS = 'CHANGE_DEV_STATUS';
export const CHANGE_UPLOAD_STATUS = 'CHANGE_UPLOAD_STATUS';
export const CHANGE_UPLOAD_STATUS_DATA = 'CHANGE_UPLOAD_STATUS_DATA';
export const CHANGE_PACK_STATUS = 'CHANGE_PACK_STATUS';
export const UPDATE_PROJECT_SETTING = 'UPDATE_PROJECT_SETTING';
export const ADD_STATUS_LIST = 'ADD_STATUS_LIST';
export const UPDATE_STATUS_LIST = 'UPDATE_STATUS_LIST';


export const UPDATE_PROJECT_NAME = 'UPDATE_PROJECT_NAME';
export const CHANGE_RUN_STATUS = 'CHANGE_RUN_STATUS';
export const IMPORT_MODULES = 'IMPORT_MODULES';
export const DEL_MODULES = 'DEL_MODULES';

// action指令，不影响 state tree 数据
export const CHANGE_PROJECT_SETTING = 'CHANGE_PROJECT_SETTING';
export const CREATE_PROJECT_ORDER = 'CREATE_PROJECT_ORDER';
export const OPEN_PROJECT_ORDER = 'OPEN_PROJECT_ORDER';
export const DEL_PROJECT_ORDER = 'DEL_PROJECT_ORDER';
export const OPEN_LINK = 'OPEN_LINK';


/*
 * action 创建函数
 */

// 切换主模块
export const changeMenuSelected = index => ({
    type: CHANGE_MENU_SELECTED,
    payload: {
        index
    }
});

// 更改工作空间
export const setWorkSpace = data => ({
    type: SET_WORKSPACE,
    payload: {
        data
    }
});

// 新增文件夹
export const addProject = data => ({
    type: ADD_PROJECT_ITEM,
    payload: {
        ...data
    }
});

// 删除文件夹
export const delProject = name => ({
    type: DEL_PROJECT_ITEM,
    payload: {
        name
    }
});

// 设置文件夹初始化数据
export const setProjectData = data => ({
    type: SET_PROJECT_DATA,
    payload: {
        data
    }
});

// 切换文件夹
export const changeActionProject = index => ({
    type: CHANGE_PROJECT_SELECTED,
    payload: {
        index
    }
});


// 设置开发按钮的状态
export const changeDevStatus = () => ({
    type: CHANGE_DEV_STATUS,
    payload: {
        // index
    }
});

// 设置上传按钮的状态
export const changeUploadStatus = () => ({
    type: CHANGE_UPLOAD_STATUS,
    payload: {
        // index
    }
});

// 设置上传按钮的状态（只修改数据）
export const changeUploadStatusData = () => ({
    type: CHANGE_UPLOAD_STATUS_DATA,
    payload: {
        // index
    }
});

// 设置打包按钮的状态
export const changePackStatus = () => ({
    type: CHANGE_PACK_STATUS,
    payload: {
        // index
    }
});

// 修改是否在运行中
export const changeRunStatus = () => ({
    type: CHANGE_RUN_STATUS,
    payload: {
    }
});

// 更新项目配置项
export const updateProjectSetting = data => ({
    type: UPDATE_PROJECT_SETTING,
    payload: {
        data
    }
});

// 新增状态信息
export const addStatusList = logs => ({
    type: ADD_STATUS_LIST,
    payload: {
        logs
    }
});

// 更新状态栏
export const updateStatusList = logs => ({
    type: UPDATE_STATUS_LIST,
    payload: {
        logs
    }
});


// 切换右侧展示的配置内容
export const changeProjectSetting = () => ({
    type: CHANGE_PROJECT_SETTING
});

// 新增文件夹指令
export const addProjectOrder = () => ({
    type: CREATE_PROJECT_ORDER
});

// 打开文件夹目录指令
export const openProjectOrder = () => ({
    type: OPEN_PROJECT_ORDER
});

// 后端删除文件夹
export const delProjectOrder = () => ({
    type: DEL_PROJECT_ORDER
});

// 修改文件夹名称
export const updateProjectName = () => ({
    type: UPDATE_PROJECT_NAME
});

// 导入模块名
export const importModules = () => ({
    type: IMPORT_MODULES
});

// 删除模块名
export const delModules = () => ({
    type: DEL_MODULES
});

