
/*
 * 自定义中间件，用于全局记录上一次的action对象
 */
const recordStore = store => next => action => {
    window.preAction = action;
    return next(action);
}

export default recordStore;

