
/**
 * reducer
 */

import {
    CHANGE_MENU_SELECTED,
    SET_WORKSPACE,
    ADD_PROJECT_ITEM, DEL_PROJECT_ITEM, SET_PROJECT_DATA, CHANGE_PROJECT_SELECTED,
    CHANGE_DEV_STATUS, CHANGE_UPLOAD_STATUS, CHANGE_PACK_STATUS, CHANGE_RUN_STATUS,
    UPDATE_PROJECT_SETTING,
    ADD_STATUS_LIST, UPDATE_STATUS_LIST,
    UPDATE_PROXY_HOST, ADD_PROXY_ITEM, UPDATE_PROXY_ITEM, DEL_PROXY_ITEM, SET_PROXY_DATA,
    UPDATE_DOC_LIST,
    UPDATE_INSTALL_PROGRESS, UPDATE_INSTALL_TOOLS_LIST
} from '../action/index';

// actionMenu state
export const actionMenuSelectedIndex = (state = 0, action = {}) => {
    switch (action.type) {
        case CHANGE_MENU_SELECTED:
            return action.payload.index;
        default:
            return state;
    }
};

// projectList list
export const projectList = (state = { selectedIndex: 0, data: [] }, action = {}) => {
    switch (action.type) {
        case SET_WORKSPACE:
            return Object.assign(
                {}, state,
                {
                    workSpace: action.payload.data
                }
            );
        case ADD_PROJECT_ITEM:
            return Object.assign(
                {}, state,
                {
                    data: [...state.data, action.payload]
                }
            );
        case DEL_PROJECT_ITEM:
            return Object.assign(
                {}, state,
                {
                    data: state.data.filter(value => value.name !== action.payload.name)
                }
            );
        case SET_PROJECT_DATA:
            return Object.assign(
                {}, state,
                {
                    data: action.payload.data
                }
            );
        case CHANGE_PROJECT_SELECTED:
            return Object.assign(
                {}, state,
                {
                    selectedIndex: action.payload.index
                }
            );
        case CHANGE_DEV_STATUS:
            return Object.assign(
                {}, state,
                {
                    data: state.data.map((value, index) => {
                        if (index === state.selectedIndex) {
                            return Object.assign(
                                {}, value,
                                {
                                    isDeveloping: !value.isDeveloping
                                }
                            );
                        }
                        return value;
                    })
                }
            );
        case CHANGE_UPLOAD_STATUS:
            return Object.assign(
                {}, state,
                {
                    data: state.data.map((value, index) => {
                        if (index === state.selectedIndex) {
                            return Object.assign(
                                {}, value,
                                {
                                    isUploading: !value.isUploading
                                }
                            );
                        }
                        return value;
                    })
                }
            );
        case CHANGE_PACK_STATUS:
            return Object.assign(
                {}, state,
                {
                    data: state.data.map((value, index) => {
                        if (index === state.selectedIndex) {
                            return Object.assign(
                                {}, value,
                                {
                                    isPackageing: !value.isPackageing
                                }
                            );
                        }
                        return value;
                    })
                }
            );
        case CHANGE_RUN_STATUS:
            return Object.assign(
                {}, state,
                {
                    data: state.data.map((value, index) => {
                        if (index === state.selectedIndex) {
                            return Object.assign(
                                {}, value,
                                {
                                    isRunning: !value.isRunning
                                }
                            );
                        }
                        return value;
                    })
                }
            );
        default:
            return state;
    }
};

// action Setting
export const actionSetting = (state = { data: {} }, action = {}) => {
    switch (action.type) {
        case UPDATE_PROJECT_SETTING:
            return Object.assign(
                {}, state,
                {
                    data: Object.assign({}, state.data, action.payload.data)
                }
            );
        default:
            return state;
    }
};

// proxyList state
export const proxyList = (state = { host: {}, data: [] }, action = {}) => {
    switch (action.type) {
        case UPDATE_PROXY_HOST:
            return Object.assign(
                {}, state,
                {
                    host: action.payload
                }
            );
        case ADD_PROXY_ITEM:
            return Object.assign(
                {}, state,
                {
                    data: [action.payload, ...state.data]
                }
            );
        case UPDATE_PROXY_ITEM:
            return Object.assign(
                {}, state,
                {
                    data: state.data.map((value) => {
                        if (value.id === action.payload.id) {
                            return action.payload;
                        }
                        return value;
                    })
                }
            );
        case DEL_PROXY_ITEM:
            return Object.assign(
                {}, state,
                {
                    data: state.data.filter(value => value.id !== action.payload.id)
                }
            );
        case SET_PROXY_DATA:
            return Object.assign(
                {}, state,
                {
                    data: action.payload.data
                }
            );
        default:
            return state;
    }
};

// docList state
export const docList = (state = {}, action = {}) => {
    switch (action.type) {
        case UPDATE_DOC_LIST:
            return action.payload;
        default:
            return state;
    }
};

// installList state
export const installList = (state = { dev: {}, tools: {} }, action = {}) => {
    switch (action.type) {
        case UPDATE_INSTALL_PROGRESS:
            return Object.assign(
                {}, state,
                {
                    dev: {
                        progressIndex: action.payload.index,
                        progressStatus: action.payload.status
                    }
                }
            );
        case UPDATE_INSTALL_TOOLS_LIST:
            return Object.assign(
                {}, state,
                {
                    tools: { ...action.payload }
                }
            );
        default:
            return state;
    }
};

// statusList state
export const statusList = (state = { data: [] }, action = {}) => {
    let logs = null;
    if (action.payload && action.payload.logs) {
        logs = action.payload.logs;
        logs = Array.isArray(logs) ? logs : [logs];
    }
    switch (action.type) {
        case ADD_STATUS_LIST:
            return Object.assign(
                {}, state,
                {
                    data: [...state.data, ...logs]
                }
            );
        case UPDATE_STATUS_LIST:
            return Object.assign(
                {}, state,
                {
                    data: logs
                }
            );
        default:
            return state;
    }
};
