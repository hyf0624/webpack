const { resolve } = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
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
        loader: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        loader: ["style-loader", "css-loader", "less-loader"],
      },
      {
        // 这种处理会有问题，处理不了html中img图片
        test: /\.(jpg|png|gif)$/,
        loader: "url-loader", // url-loader 是依赖于file-loader的
        options: {
          limit: 8 * 1024,
          esModule: false,
          outputPath: "image", //设置输出路径
          name: "[hash:10].[ext]",
        },
      },
      //处理html中的img资源
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      //处理其他资源
      {
        exclude: /\.(html|css|js|html|less|jpg|png|gif)$/,
        loader: "file-loader",
        options: {
          name: "[hash:10].[ext]",
          outputPath: "media", //设置输出路径
        },
      },
    ],
  },
  plugins: [
    //plugins的配置
    new htmlWebpackPlugin({
      //配置模板
      template: "./src/index.html",
    }),
  ],
  mode: "development",
  devServer: {
    contentBase: resolve(__dirname, "build"),
    // 启动压缩
    compress: true,
    port: 3000,
    open: true,
  },
};
