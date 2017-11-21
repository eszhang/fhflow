
export const SELECT_ACTION_MENU = 'SELECT_ACTION_MENU';

//切换模块
export const selectActionMenu = index => {      
    return {
        type: SELECT_ACTION_MENU,
        index
    }
}