/**
 * storage
 */


function fhStorage(name){
    this.name = name;
    this.localStorage = window.localStorage;
}

fhStorage.prototype = {
    constructor: fhStorage,
    get: function(){
        if (this.localStorage.getItem(name)) {
            return JSON.parse(this.localStorage.getItem(name));
        } else {
            return false;
        }
    },
    set: function(data){
        this.localStorage.setItem(name, JSON.stringify(data));
    },
    reset: function(){
        this.localStorage.removeItem(name);
    }
}

module.exports = fhStorage;