const path = require('path');
const nodeExternals = require('webpack-node-externals');
const env = process.env.NODE_ENV || 'default';

module.exports = {
  name: 'SSR',
  entry: ['babel-polyfill', './src/server/index.js'],
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'ssr.js',
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  externals: nodeExternals(),
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: 'css-loader/locals?module&localIdentName=[name]__[local]___[hash:base64:5]' },
      { test: /\.scss$/, loaders: ['css-loader', 'sass-loader'] },
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url-loader?name=src/images/[name].[ext]' }
    ]
  },
  resolve: {
    alias: {
      appSettings: path.resolve(__dirname, '../src/appSettings/' + env + '.json')
    }
  }
};
