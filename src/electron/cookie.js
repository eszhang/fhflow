/**
 * cookie缓存
 */

const { session } = require('electron');

let elCookie = function (url) {

    if (!(this instanceof elCookie))
        return new ElCookie(url);

    this.url = url;
};

elCookie.prototype = {
    constructor: elCookie,
    get: function (name, callback) {

        if (typeof name === 'function' && typeof callback === 'undefined') {
            callback = name;
            name = undefined;
        }

        if (typeof callback !== 'function') {
            throw new Error('Expected the callback to be a function.')
        }

        let filter = {
            url: this.url,
        }
        name && (filter.name = name);
        session.defaultSession.cookies.get(filter, (error, cookies) => {
            callback(error, cookies)
        })
    },
    set: function (name, value, callback) {

        if (typeof callback !== 'function') {
            throw new Error('Expected the callback to be a function.')
        }

        let details = {
            url: this.url,

        }

        name && (details.name = name);
        value && (details.value = value)

        session.defaultSession.cookies.set(details, (error) => {
            callback(error)
            session.defaultSession.cookies.get({}, function(error, cookies) {
                console.log(cookies);
              });
        })
    },
    remove: function (name, callback) {
        if (typeof callback !== 'function') {
            throw new Error('Expected the callback to be a function.')
        }
        session.defaultSession.cookies.remove(this.url, name, (error) => {
            callback(error)
        })
    }
}

module.exports = elCookie;

