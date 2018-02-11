import * as actionTypes from './actionTypes';
import { fetchData } from '../common/util';

export const updateInstallProgress = (index, status) => ({
    type: actionTypes.UPDATE_INSTALL_PROGRESS,
    payload: {
        index,
        status
    }
});

export const updateInstallToolsList = (data, pageNo, pageSize) => ({
    type: actionTypes.UPDATE_INSTALL_TOOLS_LIST,
    payload: fetchData(data, {
        pageNo,
        pageSize
    })
});
