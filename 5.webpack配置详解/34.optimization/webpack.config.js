const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
module.exports = {
  entry: './src/js/index.js',
  output: {
    // 文件名称(也可以指定目录)
    filename: 'js/[name].[contenthash:10].js',
    // 输出文目录，(所有输出资源的一个公共目录)
    path: resolve(__dirname, 'build'),
    chunkFilename: 'js/[name].[contenthash:10]_chunk.js'
  },
  module: {
    rules: [
      //loader 配置
      {
        test: /\.css$/,
        // 多个loader用 use
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: 'production',
  // 解析模块的规则
  resolve: {
    // 配置解析模块路径的别名: 优点：可以简写路径, 缺点：路径没有提示了
    alias: {
      $css: resolve(__dirname, 'src/css')
    },
    // 配置省略文件路径的后缀名
    extensions: ['.js', '.json', '.css'],
    // 告诉为webpack 解析模块是去找哪个目录
    modules: [resolve(__dirname, '../../node_modules'), 'node_modules']
  },
  optimization: {
    // 代码分割
    splitChunks: {
      chunks: 'all',
      minSize: 30 * 1024, //分割的chunk最小为30kb
      maxSize: 0, //最大没有限制
      minChunks: 1, // 要提取的chunks最少被引用1次
      maxAsyncRequests: 5, // 按需加载时并行加载的文件最大数量为5
      maxInitialRequests: 3, // 入口js文件最大并行请求数量为3
      automaticNameDelimiter: '~', // 名称连接符
      name: true, // 可以使用命名规则
      cacheGroups: {
        // 分割chunk的组
        vendors: {
          // node_modules中的文件会被打包到vendors组中的chunk中。vendors~xxx.js
          // 满足上面的公共规则，如：大小超过30kb，至少被引用一次。
          test: /[\\]node_modules[\\/]/,
          // 优先级
          priority: -10
        },
        default: {
          // 要提取的chunk最少被引用2次
          minChunks: 2,
          // 优先级
          priority: -20,
          // 如果当前要打包的模块和之前已经被提取的模块是同一个，就会复用,而不是重新打包模块
          reuseExistingChunk: true
        }
      }
    },
    // 将当前模块的记录其他模块的hash单独打包为一个runtimeChunk文件
    // 解决问题：修改a文件导致b文件的contenthash值变化，缓存失效的问题
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`
    },
    minimizer: [
      // 配置生产环境的压缩方案: js和css
      new TerserWebpackPlugin({
        cache: true, //开启缓存
        parallel: true, //开启多进程打包
        sourceMap: true //启动source-map
      })
    ]
  }
}
