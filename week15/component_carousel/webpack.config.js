module.exports = {
  entry: "./main.js",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [["@babel/plugin-transform-react-jsx",{pragma:"createElement"}]],
          },
        },
      },
      {
        test:/\.view/,
        use:{
          loader:require.resolve("./myloader.js")
        }
      }
    ],
  },
  // 开发环境，生产环境不用
  mode: "development",
  optimization: {
    minimize: false,
  },
};
