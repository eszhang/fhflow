
/**
 * 自定义中间件，用于全局记录上一次的action对象
 */

export default vb => () => next => (action) => {
    const g = window || global;

    g[vb] = action;

    return next(action);
};

