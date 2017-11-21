
import {SELECT_ACTION_MENU} from '../action/Index'

export const fetchData = (state = defaultlState , action = {}) => {
    switch(action.type){
        case SELECT_ACTION_MENU:
            return Object.assign({},state,action);
        default:
            return state
    }
}