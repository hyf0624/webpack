const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/js/index.js',
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
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: 'development',
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
  devServer: {
    // 运行代码的目录
    contentBase: resolve(__dirname, 'build'),
    // 监视 contentBase 目录下的所有文件，一旦文件变化就会reload
    watchContentBase: true,
    watchOptions: {
      // 忽略文件
      ignored: /node_modules/
    },
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 5000,
    // 域名
    host: 'localhost',
    // 自动打开浏览器
    open: true,
    // 开启HMR功能
    hot: true,
    // 不要显示启动服务器日志信息
    clientLogLevel: 'none',
    // 除了一些基本的启动信息以外，其他内容都不要显示
    quiet: true,
    // 如果出错了不要全屏提示
    overlay: false,
    // 服务器代理 -->解决开发环境下跨域问题
    proxy: {
      //一旦 devServer(5000)服务器接受到/api/xxx请求，就会把请求转发到另外一个服务器(3000)
      '/api': {
        target: 'http://localhost:3000',
        // 发送请求时，请求路径重写将/api/xxx  ---> /xxx (去掉了/api)
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
