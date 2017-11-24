
import { CHANGE_ACTION_MENU, CHANGE_GRID_LAYOUT } from '../action/index'
import { UPDATE_DOC_LIST } from '../action/index';
import { UPDATE_INSTALL_PROGRESS, UPDATE_INSTALL_TOOLS_LIST } from '../action/index'

//actionMenu state
export const actionMenuSelectedIndex = (state = 0, action = {}) => {
    switch (action.type) {
        case CHANGE_ACTION_MENU:
            return action.payload;
        default:
            return state;
    }
};

//gridLayoutType state
export const gridLayoutType = (state = 0, action = {}) => {
    switch (action.type) {
        case CHANGE_GRID_LAYOUT:
            return action.payload;
        default:
            return state;
    }
};

//docList state
export const docList = (state = {}, action = {}) => {
    switch (action.type) {
        case UPDATE_DOC_LIST:
            return { ...action.payload };
        default:
            return state;
    }
};

//installList state
export const installList = (state = { dev: {}, tools: {} }, action = {}) => {
    switch (action.type) {
        case UPDATE_INSTALL_PROGRESS:
            return Object.assign({}, state, {
                dev:{
                    progressIndex: action.payload
                }        
            });
        case UPDATE_INSTALL_TOOLS_LIST:
            return Object.assign({}, state, {
                tools: { ...action.payload }
            });
        default:
            return state;
    }
};