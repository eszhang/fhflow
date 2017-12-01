
/*
 *  task 对外接口
 */

let action = {

    dev: function (projectPath) {
        console.log('dev ...')
    },

    dist: function (projectPath) {
        console.log('dist ...')
    },

    upload: function (projectPath) {
        console.log('upload ...')
    },

    pack: function (projectPath) {
        console.log('pack ...')
    },

}

module.exports = action;