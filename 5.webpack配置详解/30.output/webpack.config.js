const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    // 文件名称(也可以指定目录)
    filename: 'js/[name].js',
    // 输出文目录，(所有输出资源的一个公共目录)
    path: resolve(__dirname, 'build'),
    // 所有资源引入的公共路径前缀 --> imgs/a.jpg ==> /img/ a.jpg
    publicPath: '/', // 一般用于生产环境
    chunkFilename: 'js/[name]_chunk.js', // 非入口chunk的名称
    library: '[name]', // 整个库向外暴露的变量名
    //libraryTarget: 'window' // 变量名添加到哪个上  browser
    //libraryTarget: 'global' // 变量名添加到哪个上 node
    libraryTarget: 'commonjs'
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: 'development'
}
