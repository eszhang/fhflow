import * as actionTypes from './actionTypes';

export const docList = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_DOC_LIST:
            return action.payload;
        default:
            return state;
    }
};
