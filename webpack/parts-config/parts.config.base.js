const path = require('path')
// const { ROOT } = require('../paths')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// const Dotenv = require('dotenv-webpack')

module.exports = {
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      svelte: path.resolve('node_modules', 'svelte')
    },
    extensions: ['*', '.js', '.vue', '.svelte', '.json'],
    mainFields: ['svelte', 'browser', 'module', 'main']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.svelte$/,
        exclude: /node_modules/,
        use: 'svelte-loader'
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    // new Dotenv({
    //   path: path.resolve(ROOT, '.env')
    // })
  ],
}
