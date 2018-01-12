
/**
 * chalk 模块
 */

const chalk = {
    blue(str) {
        return `<span style="color: #108ee9;">${str}</span>`;
    },
    green(str) {
        return `<span style="color: #00a854;">${str}</span>`;
    },
    yellow(str) {
        return `<span style="color: #ffae00;">${str}</span>`;
    },
    red(str) {
        return `<span style="color: #f13629;">${str}</span>`;
    },
    lightBlue(str) {
        return `<span style="color: rgba(102, 217, 239, 0.75)">${str}</span>`;
    }
};

module.exports = chalk;
