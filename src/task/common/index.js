
/**
 * config 
 */
const path = require('path');

const constantConfig = {
    NAME: 'fhflow',
    ROOT: path.join(__dirname, '../'),
    WORKSPACE: 'fhflow_workspace',
    CONFIGNAME: 'fhflow.config.json',
    CONFIGPATH: path.join(__dirname, '../', 'fhflow.config.json'),
    PLATFORM: process.platform,
    DEFAULT_PATH: process.platform === 'win32' ? 'desktop' : 'home',
    TEMPLAGE_PROJECT: path.resolve(path.join(__dirname, '../template/project.zip'))
};

module.exports = {
    constantConfig
}