const path = require('path');
const config = require('./config');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  return {
    mode: isProd ? 'production' : 'development',
    entry: {
      common: path.resolve(config.src.js),
    },
    output: {
      filename: `[name]${isProd ? '.min' : ''}.js`,
      chunkFilename: `[name]${isProd ? '.min' : ''}.js`,
      path: path.resolve(config.build.js),
    },
    resolve: {
      extensions: ['.js', '.mjs', '.jsx', '.json', '.css'],
    },
    module: {
      rules: [
        {
          test: /\.m?jsx?$/,
          exclude: /(node_modules|bower_components|jspm_packages)/,
          use: [
            {
              loader: 'babel-loader',
            }, {
              loader: 'eslint-loader',
              options: {
                fix: true,
                format: 'pretty',
              },
            },
          ],
        }, {
          test: /\.s?[ca]ss$/,
          use: [
            {
              loader: 'style-loader',
            }, {
              loader: 'css-loader',
              options: {
                modules: true,
              },
            }, {
              loader: 'sass-loader',
            },
          ],
        },
      ],
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            chunks: 'all',
            minChunks: 2,
          },
        },
      },
    },
    watchOptions: {
      ignored: /(node_modules|bower_components|jspm_packages)/,
      poll: 1000,
    },
    externals: {
      jquery: 'jQuery',
    },
  };
};
