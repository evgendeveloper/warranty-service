const TerserPlugin = require('terser-webpack-plugin')
const mode = 'production'

module.exports = {
  mode,
  target: 'web',
  devtool: 'source-map',
  module: {
    rules: [

    ]
  },
  plugins: [],
  optimization: {
    moduleIds: 'deterministic',
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
            // drop_console: false,
            // unsafe: true,
          },
          mangle: {
            safari10: true
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true
          },
        },
      }),
    ],
  }
}
