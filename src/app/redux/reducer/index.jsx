
import { CHANGE_ACTION_MENU, CHANGE_GRID_LAYOUT } from '../action/index'
import { UPDATE_DOC_LIST } from '../action/index';
import { UPDATE_INSTALL_PROGRESS, UPDATE_INSTALL_TOOLS_LIST } from '../action/index'

export const actionMenuSelectedIndex = (state = 0, action = {}) => {
    switch (action.type) {
        case CHANGE_ACTION_MENU:
            return action.index;
        default:
            return state;
    }
};

export const gridLayoutType = (state = 0, action = {}) => {
    switch (action.type) {
        case CHANGE_GRID_LAYOUT:
            return action.layoutType;
        default:
            return state;
    }
};

export const docList = (state = {}, action = {}) => {
    switch (action.type) {
        case UPDATE_DOC_LIST:
            return Object.assign({}, state, {
                index: action.index,
                data: action.data
            });
        default:
            return state;
    }
};

export const installList = (state = { tools: [] }, action = {}) => {
    switch (action.type) {
        case UPDATE_INSTALL_PROGRESS:
            return Object.assign({}, state, {
                PorgressIndex: action.index
            });
        case UPDATE_INSTALL_TOOLS_LIST:
            return Object.assign({}, state, {
                tools: {
                    index: action.index,
                    data: action.data
                }
            });
        default:
            return state;
    }
};