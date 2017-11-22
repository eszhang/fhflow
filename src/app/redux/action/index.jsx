
/*
 * action类型
 */
export const CHANGE_GRID_LAYOUT = 'CHANGE_GRID_LAYOUT';
export const CHANGE_ACTION_MENU = 'CHANGE_ACTION_MENU';
export const UPDATE_DOC_LIST = 'UPDATE_DOC_LIST';


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

//获取文档数据
export const updateDocList = (index,data) => ({
    type: UPDATE_DOC_LIST,
    index,
    data
});  

