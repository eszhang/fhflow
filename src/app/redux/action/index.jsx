
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
    layoutType
});

//切换主模块
export const changeActionMenu = index => ({
    type: CHANGE_ACTION_MENU,
    index
});

//更新文档数据列表
export const updateDocList = (index, data) => ({
    type: UPDATE_DOC_LIST,
    index,
    data
});

//更新安装进度
export const updateInstallProgress = index => ({
    type: UPDATE_INSTALL_PROGRESS,
    index
})

//更新工具数据列表
export const updateInstallToolsList = (index, data) => ({
    type:UPDATE_INSTALL_TOOLS_LIST,
    index,
    data
});

