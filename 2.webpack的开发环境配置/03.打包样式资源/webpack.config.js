const { resolve } = require("path");
module.exports = {
  //入口
  entry: "./src/index.js",
  //出口
  output: {
    filename: "built.js",
    path: resolve(__dirname, "build"),
  },
  //loader配置
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          //将less文件编译成css文件
          "less-loader",
        ],
      },
    ],
  },
  plugins: [],
  mode: "development",
};
