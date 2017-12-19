/**
 * storage
 */


function fhStorage(name) {

    this.name = name;
    this.localStorage = window.localStorage;

}

fhStorage.prototype = {

    constructor: fhStorage,

    get: function () {
        if (this.localStorage.getItem(this.name)) {
            return JSON.parse(this.localStorage.getItem(this.name));
        } else {
            return false;
        }
    },

    set: function (data) {
        this.localStorage.setItem(this.name, JSON.stringify(data));
    },

    reset: function () {
        this.localStorage.removeItem(this.name);
    }
}

module.exports = fhStorage;