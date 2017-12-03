var path = require("path");
var webpack = require("webpack");

module.exports = {
  devtool: "eval-source-map",
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
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules'
        ]
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
    },
    proxy: {
      '/PMV2API': {
        target: 'https://localhost:7171/',
        secure: false
      },
      '/IMOAPIServices': {
        target: 'https://localhost:7171/',
        secure: false
      },
      '/EHRV8PatientEncounterAPIServices': {
        target: 'https://localhost:7171/',
        secure: false
      },
      '/EHRV8AuthenticateAPIServices': {
        target: 'https://localhost:7171/',
        secure: false
      }
    }
  },
};
