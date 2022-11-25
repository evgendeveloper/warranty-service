const sdkConfig = require('./sdk/config.development')
const appConfig = require('./app/config.development')

const config = Array.prototype.concat([], sdkConfig, appConfig)

module.exports = config
