
/**
 * storage
 */

const config = require('./config');
const name = config.NAME;

localStorage = window.localStorage;

function get() {
    if (localStorage.getItem(name)) {
        return JSON.parse(localStorage.getItem(name));
    } else {
        return false;
    }
}

function set(data) {
    localStorage.setItem(name, JSON.stringify(data));
}

function reset() {
    localStorage.removeItem(this.name);
}

module.exports = {
    get,
    set,
    reset
};