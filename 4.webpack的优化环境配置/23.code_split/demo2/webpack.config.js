const { resolve } = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  //entry: './src/js/index.js', // 单入口
  entry: {
    main: './src/js/index.js',
    test: './src/js/test.js'
  },
  // 输出
  output: {
    // [name]：取文件名
    filename: 'js/[name].[contenthash:10].js',
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
  /**
   * 可以将node_modules中代码单独打包一个chunk最终输出
   * 自动分析多入口chunk中，有没有公共的文件，如果有会打包成单独一个chunk
   */
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  // 生产环境
  mode: 'production'
}
