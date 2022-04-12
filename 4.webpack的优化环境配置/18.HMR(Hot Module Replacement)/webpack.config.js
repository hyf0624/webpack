/*

 HMR：hot module replacement 热模块替换 / 模块热替换
  作用：一个模块发送变化，只会重新打包这一个模块，(而不是打包所有模块) 极大提升构建速度

  样式文件：可以使用HMR功能，因为style-loader内部实现了
  js文件：默认不能使用HMR功能的 --> 需要修改js代码，添加支持HRM功能的代码
  注意: HMR功能对js的处理，只能处理非入口js文件的其他文件。
  html文件：默认不能使用HMR功能的, 同时会导致html文件不能热更新了 (不需要做HMR功能)
   解决：修改entry，将html文件引入
*/

const { resolve } = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: ['./src/js/index.js', './src/index.html'],
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        loader: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        // 这种处理会有问题，处理不了html中img图片
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader', // url-loader 是依赖于file-loader的
        options: {
          limit: 8 * 1024,
          esModule: false,
          outputPath: 'image', //设置输出路径
          name: '[hash:10].[ext]'
        }
      },
      //处理html中的img资源
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      //处理其他资源
      {
        exclude: /\.(html|css|js|html|less|jpg|png|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          outputPath: 'media' //设置输出路径
        }
      }
    ]
  },
  plugins: [
    //plugins的配置
    new htmlWebpackPlugin({
      //配置模板
      template: './src/index.html'
    })
  ],
  mode: 'development',
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    // 启动压缩
    compress: true,
    port: 3000,
    open: true,
    /**
     * 需要注意的是当修改了webpack配置，新配置想要生效，必须重启webpack服务
     */
    hot: true // 开启HMR功能
  }
}
