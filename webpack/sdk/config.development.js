const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { SRC, DIST } = require('../paths')

module.exports = merge(
  require('../parts-config/parts.config.development'),
  require('../parts-config/parts.config.base'),
  {
    entry: {
      'c4d-warranty-SDK': path.resolve(SRC, 'sdk', 'index.js')
    },
    output: {
      filename: '[name].js',
      path: DIST,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(SRC, 'demo.html'),
        inject: false
      })
    ],
  }
)
