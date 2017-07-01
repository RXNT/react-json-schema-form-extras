var path = require("path");
var webpack = require("webpack");

module.exports = {
  devtool: "eval",
  entry: [
    "./playground/app",
  ],
  output: {
    path: path.join(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/static/"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "playground")
        ],
        exclude: [
          path.resolve(__dirname, "node_modules"),
        ],
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "playground"),
    historyApiFallback: true,
    hot: true,
    lazy: false,
    noInfo: false,
    overlay: {
      warnings: true,
      errors: true
    }
  },
};
