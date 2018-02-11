
/**
 * nitifier 消息提示
 */

const notifier = require('node-notifier');
const config = require('./config');

// 调用info信息提示框
function showMessageInfo(msg) {
    notifier.notify({
        type: 'info',
        title: config.NAMECN,
        message: msg,
        wait: true
    });
}

// 调用error信息提示框
function showMessageError(msg) {
    notifier.notify({
        type: 'error',
        title: config.NAMECN,
        message: msg,
        wait: true
    });
}

// 调用warn信息提示框
function showMessageWarn(msg) {
    notifier.notify({
        type: 'warn',
        title: config.NAMECN,
        message: msg,
        wait: true
    });
}

module.exports = {
    showMessageInfo,
    showMessageError,
    showMessageWarn
};
