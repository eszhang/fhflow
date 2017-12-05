const {dev} = require('./sequence'); 

/*
 *  task 对外接口
 */

let action = {

    dev: function (projectPath,packageModules) {
        dev( projectPath, packageModules );
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

    setProxy: function(config) {
        console.log('set proxy ...')
    }

}
action.dev('D:/mygit/fhFlowWorkspaceTest/fhflowTest',['backflow','FBI']);
module.exports = action;