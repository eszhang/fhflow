 
/*
 *  task 对外接口
 */

const {dev} = require('./sequence'); 
const readFhflowJson = require('./common/readFhflowJson');
const path = require('path');

let FHFLOWTASK = {};

const {
    NAME = 'FhFlow',
    ROOT = path.join(__dirname,'../'),
    WORKSPACE = 'FhFlow_workspace',
    CONFIGNAME = 'FhFLow.config.json',
    CONFIGPATH = ''

} = FHFLOWTASK;

let action = {

    dev: function (projectPath,packageModules) {
        dev( projectPath + '/fhflow.config.json',packageModules );
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

    // 更新任务配置
    setTaskModule: function(config){

    },

    // 更新任务配置
    setTaskConfig: function(proconfig){

    },

    // 更新请求代理
    setProxy: function(config) {
        console.log('set proxy ...')
    }

}
action.dev('D:/mygit/fhFlowWorkspaceTest/fhflowTest',['backflow','FBI']);
module.exports = action;