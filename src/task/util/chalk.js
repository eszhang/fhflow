
/**
 * chalk 模块
 */

const chalk = {
    blue(str) {
        return `<span style="color: #007acc;">${str}</span>`;
    },
    green(str) {
        return `<span style="color: green;">${str}</span>`;
    },
    yellow(str) {
        return `<span style="color: yellow;">${str}</span>`;
    },
    red(str) {
        return `<span style="color: red;">${str}</span>`;
    },
    lightBlue(str) {
        return `<span style="color: rgba(102, 217, 239, 0.75)">${str}</span>`;
    }
};

module.exports = chalk;
