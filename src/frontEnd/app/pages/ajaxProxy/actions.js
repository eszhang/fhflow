import * as actionTypes from './actionTypes';

// 更新本地请求host配置项
export const setProxyHost = data => ({
    type: actionTypes.SET_PROXY_HOST,
    payload: data
});

// 新增转发代理
export const addProxyItem = data => ({
    type: actionTypes.ADD_PROXY_ITEM,
    payload: data
});

// 修改转发代理
export const updateProxyItem = data => ({
    type: actionTypes.UPDATE_PROXY_ITEM,
    payload: data
});

// 删除转发代理
export const delProxyItem = id => ({
    type: actionTypes.DEL_PROXY_ITEM,
    payload: id
});

// 重置转发代理数据
export const setProxyData = data => ({
    type: actionTypes.SET_PROXY_DATA,
    payload: data
});
