import * as actionTypes from './actionTypes';
import { fetchData } from '../common/util';

export const updateDocList = (data, pageNo, pageSize) => ({
    type: actionTypes.UPDATE_DOC_LIST,
    payload: fetchData(data, {
        pageNo,
        pageSize
    })
});

