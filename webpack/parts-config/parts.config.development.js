const webpack = require('webpack')
const mode = 'development'

module.exports = {
  mode,
  target: 'web',
  devtool: 'source-map',
  performance: {
    hints: false,
  },
  module: {
    rules: []
  },
  optimization: {
    moduleIds: 'named'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
}

