
import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as action from '../action/index'
import * as reducer from '../reducer/index';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import recordStore from '../middleware/recordStore';

// 安装redux-devtools-extension的可视化工具。
import { composeWithDevTools } from 'redux-devtools-extension';

var store = createStore(
    combineReducers(reducer),
    composeWithDevTools(applyMiddleware(thunk,recordStore,createLogger()))
);

//test
window.store  = store;
window.action = action;

export default store;