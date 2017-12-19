
/**
 * store
 */

import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as action from '../action/index'
import * as reducer from '../reducer/index';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import { createRecordAction } from '../middleware/recordAction';

// 安装redux-devtools-extension的可视化工具。
import { composeWithDevTools } from 'redux-devtools-extension';

var store = createStore(
    combineReducers(reducer),
    composeWithDevTools(applyMiddleware(thunk,createRecordAction("fhPrevAction"),createLogger()))
);

//test
window.fhStore  = store;
window.fhAction = action;

export default store;   