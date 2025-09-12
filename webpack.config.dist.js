var webpack = require("webpack");
var path = require("path");
var TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  cache: true,
  context: __dirname + "/src",
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
    filename: "form-with-extras.js",
    library: "JSONSchemaForm",
    libraryTarget: "umd"
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: 5,
          compress: {
            warnings: false
          },
          mangle: true,
          output: {
            comments: false
          }
        },
        sourceMap: true
      })
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ],
  devtool: "source-map",
  externals: {
    react: {
      root: "React",
      commonjs: "react",
      commonjs2: "react",
      amd: "react"
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  }
};
