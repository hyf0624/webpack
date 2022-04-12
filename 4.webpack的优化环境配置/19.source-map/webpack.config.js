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
  },
  devtool: 'source-map'
}

/**
  source-map: 一种 提供源代码到构建后代码映射 技术 (如果构建后代码出错了，通过映射可以追踪源代码错误)
   source-map: 外部 能够提供错误代码的准确信息以及源代码的错误位置
   
   inline-source-map: 内联 (只生成一个内联source-map) 能够提供错误代码的准确信息以及源代码的错误位置
   
   hidden-source-map: 外部 错误代码错误的原因，但是没有错误位置，不能够追踪到源代码错误，只能提示到构建后代码的错误位置
   
   eval-source-map: 内联 (每一个文件都生成对应的source-map,通过eval的方式)
   错误代码的准确信息 和源代码的错误位置
   
   nosources-source-map: 外部
   错误代码准确信息，但没有任何源代码信息
   cheap-source-map: 外部
   错误代码准确信息和源代码的错误位置，只能精确到行
   cheap-module-source-map: 外部
    错误代码准确信息和源代码的错误位置
    module会将loader的source map加入
   
    内联和外部的区别： 1.外部生成了文件，内联是没有的 2.内联构建速度更快
  
  
  开发环境：速度快，调试更友好
          速度快(eval > inline > cheap ...)
              eval-cheap-source-map是最快的
              eval-source-map
          调试更友好 
            source-map
            cheaap-module-source-map
            cheaap-source-map
        
          ---> eval-source-map

  生产环境：源代码要不要隐藏? 调试要不要更友好?
    内联会让代码体积变大，所以在生产环境不用内联
    nosources-source-map全部隐藏
    hidden-source-map 只会隐藏源代码， 会提示构建后代码错误信息

    --->source-map / cheap-module-souce-map
*/
