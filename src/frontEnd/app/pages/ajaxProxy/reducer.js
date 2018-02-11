import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';

const setProxyHost = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.SET_PROXY_HOST:
            return action.payload;
        default:
            return state;
    }
};

const setProxys = (state = [], action) => {
    switch (action.type) {
        case actionTypes.ADD_PROXY_ITEM:
            return [action.payload, ...state.data];
        case actionTypes.UPDATE_PROXY_ITEM:
            return state.data.map((value) => {
                if (value.id === action.payload.id) {
                    return action.payload;
                }
                return value;
            });
        case actionTypes.DEL_PROXY_ITEM:
            return state.data.filter(value => value.id !== action.payload);
        case actionTypes.SET_PROXY_DATA:
            return action.payload;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    host: setProxyHost,
    data: setProxys
});

export default rootReducer;
