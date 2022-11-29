const path = require('path')

module.exports = {
  mode: "development",
  // entry: './src/assets/ts/index.ts',
  entry: './src/assets/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/assets/js')
  }, 
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                // プリセットを指定することで、ES2021 を ES5 に変換
                "@babel/preset-env",
              ],
            },
          },
        ],
      },
      // {
      //   test: /\.ts$/,
      //   use: 'ts-loader',
      // },
      {
        // node_module内のcss
        test: /node_modules\/(.+)\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: { url: false },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [
      '.ts', '.js',
    ],
  },
};