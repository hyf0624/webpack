const { resolve } = require("path")
const htmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "js/built.js",
    path: resolve(__dirname, "build"),
  },

  plugins: [
    new htmlWebpackPlugin({
      template: "./src/index.html",
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true,
      },
    }),
  ],
  // 生产环境下，会自动压缩js代码
  mode: "production",
}
