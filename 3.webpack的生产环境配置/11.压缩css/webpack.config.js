const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MinCssExtractPlugin = require("mini-css-extract-plugin");
const optimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
//设置nodeJS环境变量
process.env.NODE_ENV = "development";
module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "js/built.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MinCssExtractPlugin.loader,
          "css-loader",
          /* 
            css兼容性处理：postcss ---> postcss-loader postcss-preset-env
              帮助postcss找到package.json中的browserslist里面的配置，通过配置加载指定的css兼容性样式
             "browserslist": {
                //开发环境 --> 设置node环境变量
                "development": [
                  "last 1 chrome version",
                  "last 1 firefox version",
                  "last 1 saafari version"
                ],
                //默认使用生产环境
                "production": [
                  ">0.2%",
                    "not dead",
                    "not op_mini all"
                ]
              }         
          
          */
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [
                //postcss的插件
                require("postcss-preset-env")(),
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MinCssExtractPlugin({
      //对输出的css文件重命名
      filename: "css/built.css",
    }),
    //压缩css
    new optimizeCssAssetsWebpackPlugin(),
  ],
  mode: "development",
};
