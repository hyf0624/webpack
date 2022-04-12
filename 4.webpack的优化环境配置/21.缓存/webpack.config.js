const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * 缓存：
 *    babel缓存
 *      cacheDirectory: true
 *      --> 让第二次打包构建速度更快
 *    文件资源缓存
 *      hash: 每次webpack构建时会生成一个唯一的hash值
 *        问题：因为js和css同时使用一个hash值,如果重新打包，会导致缓存失效。(可能只改动了一个文件)
 *      chunkhash: 根据chunk生成hash值。如果打包来源同一个chunk，那么hash值就一样
 *        问题：js和css的hash值还是一样的
 *           因为css是在js中被引入的，所以同属于一个chunk
 *       contenthash: 根据文件的内容生成hash值，不同文件hash值一定不一样
 *        --> 让代码上线运行缓存更好使用
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
    new OptimizeCssAssetsWebpackPlugin()
  ],
  // 生产环境
  mode: 'production',
  devtool: 'source-map'
}
