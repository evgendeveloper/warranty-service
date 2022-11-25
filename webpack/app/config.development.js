const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { SRC, DIST } = require('../paths')

module.exports = merge(
  require('../parts-config/parts.config.development'),
  require('../parts-config/parts.config.base'),
  {
    entry: {
      bundle: path.resolve(SRC, 'app', 'index.js')
    },
    output: {
      filename: '[name].js',
      path: path.resolve(DIST, 'app'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(SRC, 'app', 'index.html'),
      })
    ],
  }
)
