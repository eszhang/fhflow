import * as actionTypes from './actionTypes';

// 打开连接
export const openLink = link => ({
    type: actionTypes.OPEN_LINK,
    payload: {
        link
    }
});
