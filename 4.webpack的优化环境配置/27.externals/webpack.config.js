const { resolve } = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 入口文件
  entry: './src/js/index.js',
  // 输出
  output: {
    filename: 'js/built.[contenthash:10].js',
    path: resolve(__dirname, 'build')
  },

  // 配置plugins插件
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // html压缩
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    })
  ],
  // 生产环境
  mode: 'development',
  externals: {
    // 忽略库名 -- npm 包
    jquery: 'jquery'
  }
}
