
/**
 *  config
 */

const path = require('path');

const config = {
    NAME: 'fhflow',
    NAMECN: '烽火前端开发工具',
    ROOT: path.join(__dirname, '../'),
    WORKSPACE: 'fhflow_workspace',
    PLATFORM: process.platform,
    DEFAULT_PATH: process.platform === 'win32' ? 'desktop' : 'home'
};

module.exports = config;
