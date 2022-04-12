const { resolve } = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "built.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        // 这种处理会有问题，处理不了html中img图片
        test: /\.(jpg|png|gif)$/,
        loader: "url-loader", // url-loader 是依赖于file-loader的
        options: {
          // 图片大小小于8kb，就好处理成base64处理，
          // 优点：减少请求数量(减去服务器压力)
          limit: 8 * 1024,

          /*
           url-loader默认使用es6模块化解析，而html-loader引入的图片是commonJs解析，
           解析时可能会出现问题
          */
          //关闭url-loader的es6模块化，使用commonJS解析
          esModule: false,

          //给图片重命名,取hash值的前十位, [ext]表示取文件的原拓展名
          name: "[hash:10].[ext]",
        },
      },
      {
        test: /\.html$/,
        // 处理html文件的img图片的(负责引入img，从而能被url-loader进行处理)
        loader: "html-loader",
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  mode: "development",
};
