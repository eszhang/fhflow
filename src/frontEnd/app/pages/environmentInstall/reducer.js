import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';

const updateInstallProgress = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_INSTALL_PROGRESS:
            return action.payload;
        default:
            return state;
    }
};

const updateInstallTools = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_INSTALL_TOOLS_LIST:
            return action.payload;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    dev: updateInstallProgress,
    tools: updateInstallTools
});

export default rootReducer;
