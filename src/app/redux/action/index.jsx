
/*
 * action类型
 */
export const CHANGE_ACTION_MENU = 'CHANGE_ACTION_MENU';
export const UPDATE_STATUS_LIST = 'UPDATE_STATUS_LIST';
export const UPDATE_PROXY_HOST = 'UPDATE_PROXY_HOST';
export const ADD_PROXY_ITEM = 'ADD_PROXY_ITEM';
export const UPDATE_PROXY_ITEM = 'UPDATE_PROXY_ITEM';
export const DELETE_PROXY_ITEM = 'DELETE_PROXY_ITEM';
export const SET_PROXY_DATA = 'SET_PROXY_DATA';
export const UPDATE_PROXY_LIST = 'UPDATE_PROXY_LIST';
export const UPDATE_DOC_LIST = 'UPDATE_DOC_LIST';
export const UPDATE_INSTALL_TOOLS_LIST = 'UPDATE_INSTALL_TOOLS_LIST';
export const UPDATE_INSTALL_PROGRESS = 'UPDATE_INSTALL_PROGRESS';
export const CHANGE_ACTION_PROJECT = 'CHANGE_ACTION_PROJECT';
export const SET_PROJECT_DATA = 'SET_PROJECT_DATA';
export const ADD_ACTION_PROJECT = 'ADD_ACTION_PROJECT';
export const DEl_ACTION_PROJECT = 'DEl_ACTION_PROJECT';
export const CHANGE_DEV_STATUS = 'CHANGE_DEV_STATUS';
export const CHANGE_UPLOAD_STATUS = 'CHANGE_UPLOAD_STATUS';
export const CHANGE_PACK_STATUS = 'CHANGE_PACK_STATUS';
// export const SET_ACTION_DATA = 'SET_ACTION_DATA';
export const UPDATE_PROJECT_SETTING = 'UPDATE_PROJECT_SETTING';


/*
 * action 创建函数
 */

//切换主模块
export const changeActionMenu = index => ({
    type: CHANGE_ACTION_MENU,
    payload: {
        index
    },
});

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
export const deleteProxyItem = (id) => ({
    type: DELETE_PROXY_ITEM,
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

//设置文件夹初始化数据
export const setProjectData = (data) => ({
    type: SET_PROJECT_DATA,
    payload: {
        data
    }
});

//切换文件夹
export const changeActionProject = (index) => ({
    type: CHANGE_ACTION_PROJECT,
    payload: {
        index
    },
});

//新增文件夹
export const addProject = (data) => ({
    type: ADD_ACTION_PROJECT,
    payload: {
        data
    }
});

//删除文件夹
export const delProject = (index) => ({
    type: DEl_ACTION_PROJECT,
    payload: {
        index
    }
});

//设置开发按钮的状态
export const changeDevStatus = (index) => ({
    type: CHANGE_DEV_STATUS,
    payload: {
        index
    }
});

//设置上传按钮的状态
export const changeUploadStatus = (index) => ({
    type: CHANGE_UPLOAD_STATUS,
    payload: {
        index
    }
});

//设置打包按钮的状态
export const changePackStatus = (index) => ({
    type: CHANGE_PACK_STATUS,
    payload: {
        index
    }
});

//设置项目配置项
// export const setActionData = (data) => ({
//     type: SET_ACTION_DATA,
//     payload: {
//         data
//     }
// });

//更新项目配置项
export const updateProjectSetting = (data) => ({
    type:  UPDATE_PROJECT_SETTING,
    payload: {
        data
    }
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