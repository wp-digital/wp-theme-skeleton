/* eslint-disable */
const webpack = require('webpack');
const config = require('./config');
const isProd = process.env.NODE_ENV === 'production';

let plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  })
];

module.exports = {
  output: {
    path: require('path').resolve(config.src.js),
    chunkFilename: `[name]${isProd ? '.min' : ''}.js`,
    filename: `common${isProd ? '.min' : ''}.js`
  },
  mode: isProd ? 'production' : 'development',
  externals: {
    jquery: 'jQuery'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'all',
          minChunks: 2
        }
      }
    }
  },
  plugins,
  devtool: !isProd ? '#source-map' : false
};
