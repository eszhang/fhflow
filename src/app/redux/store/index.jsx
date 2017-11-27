
import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as reducer from '../reducer/index';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';

// 安装redux-devtools-extension的可视化工具。
import { composeWithDevTools } from 'redux-devtools-extension';

var store = createStore(
    combineReducers(reducer),
    composeWithDevTools(applyMiddleware(thunk,createLogger()))
);

export default store;