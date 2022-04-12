const { resolve } = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "built.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [],
  },
  plugins: [
    //plugins的配置
    new htmlWebpackPlugin({
      //配置模板
      template: "./src/index.html",
    }),
  ],
  mode: "development",
};
