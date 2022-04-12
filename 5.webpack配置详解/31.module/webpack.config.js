const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    // 文件名称(也可以指定目录)
    filename: 'js/[name].js',
    // 输出文目录，(所有输出资源的一个公共目录)
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      //loader 配置
      {
        test: /\.css$/,
        // 多个loader用 use
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        // 排除node_modules下的js文件
        exclude: /node_modules/,
        // 只检查src下的js文件
        include: resolve(__dirname, 'src'),
        // 优先执行
        enforce: 'pre',
        //延后执行
        //enforce: 'post',
        // 单个loader 用loader
        loader: 'eslint-loader',
        options: {
          // 一些配置...
        }
      },
      {
        // 以下配置只会生效一个
        oneOf: []
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: 'development'
}
