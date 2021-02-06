const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // configuration for webpack-dev-server
    publicPath: 'dist'
  },
  // Helps with debugging in the browser
  devtool: 'inline-source-map',
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
  }
};