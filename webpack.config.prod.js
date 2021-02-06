const path = require('path');
// This module cleans out the output folder before rendering a new one.
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
  // Adding mode to production allows for webpack minification and optimization.
  mode: 'production',
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'none',
  // With the module, property, you are telling webpack how to work with the files it finds.
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new CleanPlugin.CleanWebpackPlugin()
  ]
};