
/**
 * nitifier 消息提示
 */

const notifier = require('node-notifier');
const config = require('./config');

function showMessageInfo(msg) {
    notifier.notify({
        type: 'info',
        title: config.NAMECN,
        message: msg,
        wait: true,
    })
}

function showMessageError(msg) {
    notifier.notify({
        type: 'error',
        title: config.NAMECN,
        message: msg,
        wait: true,
    })
}

function showMessageWarn(msg) {
    notifier.notify({
        type: 'warn',
        title: config.NAMECN,
        message: msg,
        wait: true,
    })
}

module.exports = {
    showMessageInfo,
    showMessageError,
    showMessageWarn
}