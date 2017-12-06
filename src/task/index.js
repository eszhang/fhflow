
/*
 *  task 对外接口
 */

const path = require('path');
const { dev } = require('./sequence');
const { isFileExist, isDirExist } = require('./util/index');
const copy = require('common/copy');

const FHFLOWTASK = {};

const {
    NAME = 'FhFlow',
    ROOT = path.join(__dirname, '../'),
    WORKSPACE = 'FhFlow_workspace',
    CONFIGNAME = 'FhFLow.config.json',
    CONFIGPATH = path.join(__dirname, '../', Common.CONFIGNAME),
    PLATFORM = process.platform,
    DEFAULT_PATH = process.platform === 'win32' ? 'desktop' : 'home',
    TEMPLAGE_PROJECT = path.resolve(path.join(__dirname, '../templates/project.zip')),
    TEMPLAGE_EXAMPLE = path.resolve(path.join(__dirname, '../templates/example.zip')),
    EXAMPLE_NAME = 'WeFlow-example',

} = FHFLOWTASK;

let currentConfigPath;



let commonMethod = (function () {

    let methods = {

        // 初始化配置项
        initConfig: function (projectPath, cb) {

            let configPath = path.join(projectPath, CONFIGNAME);

            if (!isFileExist(configPath)) {
                copy({
                    src: CONFIGPATH,
                    dest: projectPath,
                }, function(){
                    cb();
                })
            }else{
                cb();
            }
        },

        // 更新提交配置项
        updateConfig: function(config, cb){
            fs.writeFile(curConfigPath, JSON.stringify(config, null, 4), function (err) {
                if (err) {
                    throw new Error(err);
                }
                cb();
            })
        }
    }

    return methods;
});

let action = {

    dev: function (projectPath, packageModules) {
        dev(projectPath, packageModules);
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
    setTaskModule: function (config) {

    },

    // 更新任务配置
    setTaskConfig: function (proconfig) {

    },

    // 更新请求代理
    setProxy: function (config) {
        console.log('set proxy ...')
        updateConfig(config)
    }

}
// action.dev('D:/mygit/fhFlowWorkspaceTest/fhflowTest',['backflow','FBI']);
action.dev('F:/ourResposity/fhflowWorkspace/fk', []);
module.exports = action;