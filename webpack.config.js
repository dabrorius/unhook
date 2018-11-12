const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/popup.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "popup.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "popup.html",
      template: "./src/popup.html"
    })
  ]
};
