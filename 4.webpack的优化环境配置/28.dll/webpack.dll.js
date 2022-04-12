/*
  使用dll技术，对某些库(第三方库: jquery, react, vue...)进行单独打包
  当你运行webpack时，默认查找webpack.config.js 配置文件
  需求：需要运行webpack.dll.js文件
   --> npx webpack --mode=production --config webpack.dll.js
*/
const { resolve } = require('path')

const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

module.exports = {
  entry: {
    // 最终打包生成的[name] --> jquery
    // ['jquery'] ---> 要打包的库是jquery
    jquery: ['jquery']
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dll'),
    library: '[name]_[hash]' //打包的库里面向外暴露的内容叫什么名字
  },
  plugins: [
    // 打包生成一个mainfest.json文件，---> 提供和jquery映射
    new webpack.DllPlugin({
      name: '[name]_[hash]', //映射库的暴露的内容名称
      path: resolve(__dirname, 'dll/mainfest.json')
    })
    // // 将某个文件打包输出去，并在html中自动引入该资源
    // new AddAssetHtmlWebpackPlugin({
    //   filepath: resolve(__dirname, 'dll/jquery.js')
    // })
  ],
  mode: 'production'
}

