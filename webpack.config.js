const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    popup: "./src/popup.js",
    blockPage: "./src/blockPage.js",
    onDocumentStart: "./src/onDocumentStart.js",
    onDocumentIdle: "./src/onDocumentIdle.js",
    background: "./src/background.js"
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        use: [
          {
            loader: "file-loader",
            options: { name: "[name].[ext]" }
          }
        ],
        type: "javascript/auto"
      },
      {
        test: /\.css|\.png|\.svg$/,
        use: [
          {
            loader: "file-loader",
            options: { name: "[name].[ext]" }
          }
        ]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "popup.html",
      template: "./src/popup.html",
      chunks: ["popup"]
    }),
    new HtmlWebpackPlugin({
      filename: "blockPage.html",
      template: "./src/blockPage.html",
      chunks: ["blockPage"]
    })
  ]
};
