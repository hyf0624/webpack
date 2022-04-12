const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 定义nodeJS环境变量：决定使用browserslist的哪个环境
process.env.NODE_ENV = 'production'
// 将公共的loader提取出来
const commonLoader = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    // css 兼容性处理, 还需在package.json中定义browserslist
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => [require('postcss-preset-env')()]
    }
  }
]
module.exports = {
  // 入口文件
  entry: './src/index.js',
  // 输出
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  //配置loader
  module: {
    /**
     * 正常来讲，一个文件只能被一个loader处理，
     * 当一个文件要被多个loader处理时，那一定要指定loader执行的先后顺序。
     */
    rules: [
      {
        // css文件
        test: /\.css$/,
        use: [...commonLoader]
      },
      {
        //less 文件
        test: /\.less$/,
        use: [...commonLoader, 'less-loader']
      },
      {
        //在package.json中 eslintConfig ---> airbnb
        test: /\.js$/,
        exclude: /node_modules/,
        // 优先执行
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          //预设：指示babel做怎样的兼容性处理
          presets: [
            [
              '@babel/preset-env',
              {
                //按需加载
                useBuiltIns: 'usage',
                // 指定core-js版本
                corejs: {
                  version: 3
                },
                // 指定兼容性做到哪个版本的浏览器
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17'
                }
              }
            ]
          ]
        }
      },
      {
        // 处理图片
        test: /\.(jpg|png|gif)/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10],[ext]',
          outputPath: 'image',
          // 关闭es6 处理方式, 使用commonJS处理方式
          esModule: false
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        exclude: /\.(js|html|css|less|jpg|png|gif)/,
        loader: 'file-loader',
        options: {
          outputPath: 'media'
        }
      }
    ]
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
    }),
    //单独提取css文件
    new MiniCssExtractPlugin({
      filename: 'css/built.css'
    }),
    //压缩css
    new OptimizeCssAssetsWebpackPlugin()
  ],
  // 生产环境
  mode: 'production'
}
