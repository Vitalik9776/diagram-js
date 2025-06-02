const path = require('path');

module.exports = {
  mode: 'development',
  entry: './demo/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'demo')
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'demo')
    },
    port: 8080,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        type: 'asset/source'
      },
      {
        test: /\.png$/,
        type: 'asset/resource'
      }
    ]
  },
  resolve: {
    mainFields: [ 'dev:module', 'module', 'main' ],
    modules: [ 'node_modules', path.resolve(__dirname) ]
  },
  devtool: 'source-map'
};
