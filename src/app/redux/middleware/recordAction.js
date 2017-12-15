
/**
 * 自定义中间件，用于全局记录上一次的action对象
 */

export const  createRecordAction = (vb) => {

    return store => next => action => {
        
        let  g = window || global;
    
        g[vb] = action;
    
        return next(action);
    }
}

