
/**
 * 配置项
 */

const config = {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || (process.env.NODE_ENV === 'production' ? 8080 : 3000),
    hotReloadHost: 'localhost',
    hotReloadPort: '8004'
};

module.exports = config;
