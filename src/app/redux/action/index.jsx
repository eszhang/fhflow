
/**
 * action 与 actionCreator
 */

/*
 * action类型
 */
export const CHANGE_MENU_SELECTED = 'CHANGE_MENU_SELECTED';
export const SET_WORKSPACE = 'SET_WORKSPACE';
export const ADD_PROJECT_ITEM = 'ADD_PROJECT_ITEM';
export const DEl_PROJECT_ITEM = 'DEl_PROJECT_ITEM';
export const SET_PROJECT_DATA = 'SET_PROJECT_DATA';
export const CHANGE_PROJECT_SELECTED = 'CHANGE_PROJECT_SELECTED';
export const CHANGE_DEV_STATUS = 'CHANGE_DEV_STATUS';
export const CHANGE_UPLOAD_STATUS = 'CHANGE_UPLOAD_STATUS';
export const CHANGE_PACK_STATUS = 'CHANGE_PACK_STATUS';
export const UPDATE_PROJECT_SETTING = 'UPDATE_PROJECT_SETTING';
export const ADD_STATUS_LIST = 'ADD_STATUS_LIST';
export const UPDATE_STATUS_LIST = 'UPDATE_STATUS_LIST';
export const UPDATE_PROXY_HOST = 'UPDATE_PROXY_HOST';
export const ADD_PROXY_ITEM = 'ADD_PROXY_ITEM';
export const UPDATE_PROXY_ITEM = 'UPDATE_PROXY_ITEM';
export const DEL_PROXY_ITEM = 'DEL_PROXY_ITEM';
export const SET_PROXY_DATA = 'SET_PROXY_DATA';
export const UPDATE_DOC_LIST = 'UPDATE_DOC_LIST';
export const UPDATE_INSTALL_PROGRESS = 'UPDATE_INSTALL_PROGRESS';
export const UPDATE_INSTALL_TOOLS_LIST = 'UPDATE_INSTALL_TOOLS_LIST';

//action指令，不影响 state tree 数据
export const CHANGE_PROJECT_SETTING = 'CHANGE_PROJECT_SETTING';
export const CREATE_PROJECT_ORDER = 'CREATE_PROJECT_ORDER';
export const OPEN_PROJECT_ORDER = 'OPEN_PROJECT_ORDER';
export const DEl_PROJECT_ORDER = 'DEl_PROJECT_ORDER';


/*
 * action 创建函数
 */

//切换主模块
export const changeMenuSelected = index => ({
    type: CHANGE_MENU_SELECTED,
    payload: {
        index
    },
});

//更改工作空间
export const setWorkSpace = (data) => ({
    type: SET_WORKSPACE,
    payload: {
        data
    }
});

//新增文件夹
export const addProject = (data) => ({
    type: ADD_PROJECT_ITEM,
    payload: {
        ...data
    }
});

//删除文件夹
export const delProject = (name) => ({
    type: DEl_PROJECT_ITEM,
    payload: {
        name
    } 
});

//设置文件夹初始化数据
export const setProjectData = (data) => ({
    type: SET_PROJECT_DATA,
    payload: {
        data
    }
});

//切换文件夹
export const changeActionProject = (index) => ({
    type: CHANGE_PROJECT_SELECTED,
    payload: {
        index
    },
});


//设置开发按钮的状态
export const changeDevStatus = (index) => ({
    type: CHANGE_DEV_STATUS,
    payload: {
        // index
    }
});

//设置上传按钮的状态
export const changeUploadStatus = (index) => ({
    type: CHANGE_UPLOAD_STATUS,
    payload: {
        // index
    }
});

//设置打包按钮的状态
export const changePackStatus = (index) => ({
    type: CHANGE_PACK_STATUS,
    payload: {
        // index
    }
});

//更新项目配置项
export const updateProjectSetting = (data) => ({
    type: UPDATE_PROJECT_SETTING,
    payload: {
        data
    }
});

//新增状态信息
export const addStatusList = (data) => ({
    type: ADD_STATUS_LIST,
    payload: {
        data
    }
})

//更新状态栏
export const updateStatusList = (data) => ({
    type: UPDATE_STATUS_LIST,
    payload: {
        data
    }
})

//更新本地请求host配置项
export const updateProxyHost = (data) => ({
    type: UPDATE_PROXY_HOST,
    payload: {
        ...data
    }
})

//新增转发代理
export const addProxyItem = (data) => {
    let uniqueID = Date.now();
    return {
        type: ADD_PROXY_ITEM,
        payload: {
            id: uniqueID,
            key: uniqueID,
            ...data
        }
    }
}

//修改转发代理
export const updateProxyItem = (data) => ({
    type: UPDATE_PROXY_ITEM,
    payload: {
        ...data
    }
})

//删除转发代理
export const delProxyItem = (id) => ({
    type: DEL_PROXY_ITEM,
    payload: {
        id
    }
});

//重置转发代理数据
export const setProxyData = (data) => ({
    type: SET_PROXY_DATA,
    payload: {
        data
    }
});

//更新文档数据列表
export const updateDocList = (data, pageNo, pageSize) => ({
    type: UPDATE_DOC_LIST,
    payload: fetchData(data, {
        pageNo,
        pageSize
    })
});

//更新安装进度
export const updateInstallProgress = index => ({
    type: UPDATE_INSTALL_PROGRESS,
    payload: {
        index,
        status
    }
});

//更新工具数据列表
export const updateInstallToolsList = (data, pageNo, pageSize) => ({
    type: UPDATE_INSTALL_TOOLS_LIST,
    payload: fetchData(data, {
        pageNo,
        pageSize
    })
});

//切换右侧展示的配置内容
export const changeProjectSetting = (index) => ({
    type: CHANGE_PROJECT_SETTING
});

//新增文件夹指令
export const addProjectOrder = () => ({
    type: CREATE_PROJECT_ORDER
});

//打开文件夹目录指令
export const openProjectOrder = (data) => ({
    type: OPEN_PROJECT_ORDER
});

//后端删除文件夹
export const delProjectOrder = () => ({
    type: DEl_PROJECT_ORDER
});



/*==============*/

//模拟分页获取数据
const fetchData = (data = [], condition = { pageNo: 1, pageSize: 10 }) => {

    let { pageNo, pageSize } = condition,
        totalRows = data.length,
        totalPages = Math.ceil(totalRows / pageSize),
        res;

    res = {
        data: data.slice((pageNo - 1) * pageSize, pageNo * pageSize),
        page: {
            pageNo: pageNo,
            pageSize: pageSize,
            totalPages: totalPages,
            totalRows: totalRows
        }
    }

    return res;
}