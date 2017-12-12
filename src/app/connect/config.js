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
    DEFAULT_PATH: process.platform === 'win32' ? 'desktop' : 'home',
    TEMPLAGE_PROJECT: path.resolve(path.join(__dirname, '../templates/project.zip')),
    TEMPLAGE_EXAMPLE: path.resolve(path.join(__dirname, '../templates/example.zip')),
    EXAMPLE_NAME: 'fhflow-example'
}

module.exports = config;