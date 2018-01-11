
/**
 * clean 操作
 */

const del = require('del');
const chalk = require('chalk');

module.exports = (config = {}, cbs = {}) => {
    const { src, force = true } = config;
    const {
        start = function () { },
        log = function () { },
        end = function () { }
    } = cbs;

    start();

    const stream = del(src, {
        force
    }).then((paths) => {
        log(chalk.green(`
            ✔ Deleted files and folders:
                ${paths.join}
            `));
        end();
    }, (err) => {
        log(err);
        end();
    });

    return stream;
};
