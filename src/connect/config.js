/**
 *  config
 */

const path = require('path');

let config = {
    NAME: "fhflow",
    ROOT: path.join(__dirname, '../'),
    WORKSPACE: 'fhflow_workspace',
    CONFIGNAME: 'fhlow.config.json',
    CONFIGPATH: path.join(__dirname, '../', 'fhflow.config.json'),
    PLATFORM: process.platform,
    DEFAULT_PATH: process.platform === 'win32' ? 'desktop' : 'home'
}

module.exports = config;