const fs = require('fs');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin');
const SassLintPlugin = require('sass-lint-webpack');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');
const config = require('./config');

const getEntry = dirs =>
  dirs.reduce((entry, dir) => {
    const [src, build] = dir;
    const prefix = build.replace(/.*\/([^/]+)$/g, '$1');
    const dirEntries = fs
      .readdirSync(path.resolve(src), {
        withFileTypes: true,
      })
      .filter(dirent => !dirent.isDirectory())
      .reduce(
        (entries, file) => ({
          ...entries,
          [`${prefix}/${path.parse(file.name).name}`]: path.resolve(
            src,
            file.name
          ),
        }),
        {}
      );

    return {
      ...entry,
      ...dirEntries,
    };
  }, {});
const cssBuild = config.build.css.replace(`${config.build.dir}/`, '');
const ignoreCssEmitRegex = new RegExp(`${cssBuild}/.+(\\.min)?\\.js$`);
const imgBuild = config.build.img.replace(`${config.build.dir}/`, '');
const ignoreImgEmitRegex = new RegExp(`${imgBuild}/.+(\\.min)?\\.js$`);
const excludeExternalPackagesRegex = /(node_modules|bower_components|jspm_packages)/;

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  return {
    mode: isProd ? 'production' : 'development',
    devtool: !isProd ? 'eval-source-map' : false,
    entry: getEntry([
      [config.src.js, config.build.js],
      [config.src.sass, config.build.css],
      [config.src.img, config.build.img],
    ]),
    output: {
      filename: `[name]${isProd ? '.min' : ''}.js`,
      chunkFilename: `[id]${isProd ? '.[chunkhash].min' : ''}.js`,
      path: path.resolve(config.build.dir),
    },
    resolve: {
      extensions: [
        '.js',
        '.mjs',
        '.jsx',
        '.json',
        '.css',
        '.sass',
        '.scss',
        '.jpeg',
        '.jpg',
        '.png',
        '.gif',
        '.svg',
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: `[name]${isProd ? '.min' : ''}.css`,
        chunkFilename: `[id]${isProd ? '.[chunkhash].min' : ''}.css`,
      }),
      new IgnoreEmitPlugin([ignoreCssEmitRegex, ignoreImgEmitRegex]),
      // new StyleLintPlugin({
      //   context: path.resolve(config.src.dir),
      //   syntax: 'sass',
      //   fix: true,
      //   failOnError: !argv.watch,
      // }),
      new SassLintPlugin(),
      new FriendlyErrorsWebpackPlugin({
        onErrors(severity, errors) {
          if (severity !== 'error') {
            return;
          }

          const error = errors[0];

          notifier.notify({
            title: error.name,
            message: error.message || '',
            subtitle: error.file || '',
            icon: path.resolve(config.icon),
          });
        },
      }),
    ],
    module: {
      rules: [
        {
          oneOf: [
            {
              test: /\.m?jsx?$/,
              exclude: excludeExternalPackagesRegex,
              use: [
                {
                  loader: 'babel-loader',
                },
                {
                  loader: 'eslint-loader',
                  options: {
                    fix: true,
                    format: 'pretty',
                  },
                },
              ],
            },
            {
              test: /\.(sa|sc|c)ss$/,
              include: path.resolve(config.src.sass),
              use: [
                MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: !isProd,
                  },
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    sourceMap: !isProd,
                  },
                },
                {
                  loader: 'sass-loader',
                  options: {
                    sourceMap: !isProd,
                  },
                },
              ],
            },
            {
              test: /\.(sa|sc|c)ss$/,
              include: path.resolve(config.src.js),
              exclude: /\.module\.(sa|sc|c)ss$/,
              use: [
                isProd
                  ? MiniCssExtractPlugin.loader
                  : {
                      loader: 'style-loader',
                    },
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: !isProd,
                    modules: true,
                  },
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    sourceMap: !isProd,
                  },
                },
                {
                  loader: 'sass-loader',
                  options: {
                    sourceMap: !isProd,
                  },
                },
              ],
            },
            {
              test: /\.(gif|png|jpe?g|svg)$/i,
              include: path.resolve(config.src.img),
              use: [
                {
                  loader: 'file-loader',
                  options: {
                    outputPath: imgBuild,
                    name: '[name].[ext]',
                  },
                },
                {
                  loader: 'image-webpack-loader',
                  options: {
                    mozjpeg: {
                      progressive: true,
                      quality: 65,
                    },
                    optipng: {
                      enabled: false,
                    },
                    pngquant: {
                      quality: '65-90',
                      speed: 4,
                    },
                    gifsicle: {
                      interlaced: false,
                    },
                    webp: {
                      quality: 75,
                    },
                  },
                },
              ],
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
      ignored: excludeExternalPackagesRegex,
      poll: 1000,
    },
    externals: {
      jquery: 'jQuery',
    },
  };
};
