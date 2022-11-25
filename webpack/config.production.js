const sdkConfig = require('./sdk/config.production')
const appConfig = require('./app/config.production')

const config = Array.prototype.concat([], sdkConfig, appConfig)

module.exports = config
