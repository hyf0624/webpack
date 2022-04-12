const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
/*
  PWA：渐进式网络开发应用程序(离线可访问)
  workbox --> workbox-webpack-plugin
 */

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
  entry: './src/js/index.js',
  // 输出
  output: {
    filename: 'js/built.[contenthash:10].js',
    path: resolve(__dirname, 'build')
  },
  //配置loader
  module: {
    /**
     * 正常来讲，一个文件只能被一个loader处理，
     * 当一个文件要被多个loader处理时，那一定要指定loader执行的先后顺序。
     */
    rules: [
      // 可以将eslint-loader提取出来就会先执行该loader
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
        // 以下loader只会匹配一个
        // 注意：不能有两个配置处理同一种类型文件
        oneOf: [
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
              ],
              //开启babel缓存,第二次构建时，会读取之前的缓存
              cacheDirectory: true
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
      filename: 'css/built.[contenthash:10].css'
    }),
    //压缩css
    new OptimizeCssAssetsWebpackPlugin(),
    new WorkboxWebpackPlugin.GenerateSW({
      /**
       * 1. 帮助serviceworker 快速启动
       * 2. 删除旧的 serviceworker
       *
       * 生成一个serviceworker的配置文件
       */
      clientsClaim: true,
      skipWaiting: true
    })
  ],
  // 生产环境
  mode: 'production',
  devtool: 'source-map'
}
