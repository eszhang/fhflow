
/**
 * storage
 */

const config = require('./config');

const name = config.NAME;
const localStorage = window.localStorage;

// 获取缓存
function get() {
    if (localStorage.getItem(name)) {
        return JSON.parse(localStorage.getItem(name));
    }
    return false;
}

// 设置缓存
function set(data) {
    localStorage.setItem(name, JSON.stringify(data));
}

// 重置缓存
function reset() {
    localStorage.removeItem(this.name);
}

module.exports = {
    get,
    set,
    reset
};
