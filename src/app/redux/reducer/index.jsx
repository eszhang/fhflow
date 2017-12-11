
import { CHANGE_ACTION_MENU } from '../action/index'
import { UPDATE_STATUS_LIST } from '../action/index';
import { UPDATE_PROXY_HOST, ADD_PROXY_ITEM, UPDATE_PROXY_ITEM, DELETE_PROXY_ITEM, SET_PROXY_DATA } from '../action/index'
import { UPDATE_DOC_LIST } from '../action/index';
import { UPDATE_INSTALL_PROGRESS, UPDATE_INSTALL_TOOLS_LIST } from '../action/index';
import {
    SET_PROJECT_DATA, SET_WORKSPACE,
    CHANGE_ACTION_PROJECT, DEl_ACTION_PROJECT,
    OPEN_PROJECT, ADD_ACTION_PROJECT,
    CHANGE_DEV_STATUS, CHANGE_UPLOAD_STATUS, CHANGE_PACK_STATUS
} from '../action/index'
import { UPDATE_PROJECT_SETTING } from '../action/index';

//actionMenu state
export const actionMenuSelectedIndex = (state = 0, action = {}) => {
    switch (action.type) {
        case CHANGE_ACTION_MENU:
            return action.payload.index;
        default:
            return state;
    }
};

//proxyList state
export const proxyList = (state = { host: {}, data: [] }, action = {}) => {
    switch (action.type) {
        case UPDATE_PROXY_HOST:
            return Object.assign({}, state, {
                host: action.payload
            });
        case ADD_PROXY_ITEM:
            return Object.assign({}, state, {
                data: [action.payload, ...state.data]
            });
        case UPDATE_PROXY_ITEM:
            return Object.assign({}, state, {
                data: state.data.map((value, index) => {
                    if (value.id === action.payload.id) {
                        return action.payload
                    } else {
                        return value
                    }
                })
            })
        case DELETE_PROXY_ITEM:
            return Object.assign({}, state, {
                data: state.data.filter((value, index) => {
                    return value.id !== action.payload.id;
                })
            })
        case SET_PROXY_DATA:
            return Object.assign({}, state, {
                data: action.payload.data
            })
        default:
            return state;
    }
};

//docList state
export const docList = (state = {}, action = {}) => {
    switch (action.type) {
        case UPDATE_DOC_LIST:
            return action.payload
        default:
            return state;
    }
};

//installList state
export const installList = (state = { dev: {}, tools: {} }, action = {}) => {
    switch (action.type) {
        case UPDATE_INSTALL_PROGRESS:
            return Object.assign({}, state, {
                dev: {
                    progressIndex: action.payload.index,
                    progressStatus: action.payload.status
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

//statusList state
export const statusList = (state = { data: [] }, action = {}) => {
    switch (action.type) {
        case UPDATE_STATUS_LIST:
            return Object.assign({}, state, {
                data: action.payload.data
            });
        default:
            return state;
    }
}

//projectList list
export const projectList = (state = { selectedIndex: 0, data: [] }, action = {}) => {
    switch (action.type) {
        case SET_PROJECT_DATA:
            return Object.assign({}, state,
                { ...action.payload.data }
            );
        case SET_WORKSPACE:
            return Object.assign({}, state,
                {
                    workSpace: action.payload.data
                }
            );
        case CHANGE_ACTION_PROJECT:
            return Object.assign({}, state, {
                selectedIndex: action.payload.index
            });
        case DEl_ACTION_PROJECT:
            return Object.assign({}, state, {
                data: state.data.filter((value, index) => {
                    return value.name !== action.payload.name;
                }),
                selectedIndex: 0
            })
        case ADD_ACTION_PROJECT:
            return Object.assign({}, state, {
                data: [...state.data, action.payload.data],
                selectedIndex: state.data.length
            })
        case CHANGE_DEV_STATUS:
            state.data[state.selectedIndex].isDeveloping = !state.data[state.selectedIndex].isDeveloping;
            return Object.assign({}, state, {
                data: state.data
            })
        case CHANGE_UPLOAD_STATUS:
            state.data[state.selectedIndex].isUploading = !state.data[state.selectedIndex].isUploading;
            return Object.assign({}, state, {
                data: state.data
            })
        case CHANGE_PACK_STATUS:
            state.data[state.selectedIndex].isPackageing = !state.data[state.selectedIndex].isPackageing;
            return Object.assign({}, state, {
                data: state.data
            })
        default:
            return state;
    }
};

//action Setting
export const actionSetting = (state = { selectedIndex: 0, data: {} }, action = {}) => {
    switch (action.type) {
        // case SET_ACTION_DATA:
        //     return Object.assign({}, state,
        //         { 
        //             selectedIndex: state.selectedIndex,
        //             data: action.payload.data
        //         }
        //     );
        case UPDATE_PROJECT_SETTING:
            return Object.assign({}, state, {
                data: Object.assign({}, state.data, action.payload.data)
            });

        default:
            return state;
    }
};



