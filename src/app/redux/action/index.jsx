
/*
 * action类型
 */
export const CHANGE_GRID_LAYOUT = 'CHANGE_GRID_LAYOUT';
export const CHANGE_ACTION_MENU = 'CHANGE_ACTION_MENU';
export const UPDATE_DOC_LIST = 'UPDATE_DOC_LIST';
export const UPDATE_INSTALL_TOOLS_LIST = 'UPDATE_INSTALL_TOOLS_LIST';
export const UPDATE_INSTALL_PROGRESS = 'UPDATE_INSTALL_PROGRESS';


/*
 * action 创建函数
 */

//切换布局
export const changeGridLayout = layoutType => ({
    type: CHANGE_GRID_LAYOUT,
    payload: layoutType
});

//切换主模块
export const changeActionMenu = index => ({
    type: CHANGE_ACTION_MENU,
    payload: index,
});

//更新文档数据列表
export const updateDocList = (data, pageNo, pageSize) => {
    return {
        type: UPDATE_DOC_LIST,
        payload: fetchData(data, {
            pageNo,
            pageSize
        })
    }
};

//更新安装进度
export const updateInstallProgress = index => ({
    type: UPDATE_INSTALL_PROGRESS,
    payload: index
})

//更新工具数据列表
export const updateInstallToolsList = (data, pageNo, pageSize) => ({
    type: UPDATE_INSTALL_TOOLS_LIST,
    payload: fetchData(data, {
        pageNo,
        pageSize
    })
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