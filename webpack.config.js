const fs = require('fs');
const notifier = require('node-notifier');
const path = require('path');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-bare-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');

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
const ignoreCssEmitRegex = new RegExp(`${cssBuild}/.+(\\.min)?\\.js(\\.map)?$`);
const imgBuild = config.build.img.replace(`${config.build.dir}/`, '');
const ignoreImgEmitRegex = new RegExp(`${imgBuild}/.+(\\.min)?\\.js(\\.map)?$`);
const externalPackagesRegex = /(node_modules|bower_components|jspm_packages)/;

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';
  const mode = isProd ? 'production' : 'development';

  process.env.BABEL_ENV = mode;
  process.env.NODE_ENV = mode;

  return {
    mode,
    devtool: !isProd ? 'cheap-module-source-map' : false,
    entry: getEntry([
      [config.src.js, config.build.js],
      [config.src.sass, config.build.css],
      [config.src.img, config.build.img],
    ]),
    output: {
      filename: `[name]${isProd ? '.[hash].min' : ''}.js`,
      chunkFilename: `[id]${isProd ? '.[chunkhash].min' : ''}.js`,
      path: path.resolve(config.build.dir),
    },
    resolve: {
      modules: [path.resolve(config.src.dir), 'node_modules'],
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
      new CleanPlugin(),
      new MiniCssExtractPlugin({
        filename: `[name]${isProd ? '.[hash].min' : ''}.css`,
        chunkFilename: `[id]${isProd ? '.[chunkhash].min' : ''}.css`,
        sourceMap: !isProd,
      }),
      new IgnoreEmitPlugin([ignoreCssEmitRegex, ignoreImgEmitRegex]),
      new StyleLintPlugin({
        files: path.join(config.src.sass, '**/*.s?(c|a)ss'),
        syntax: 'sass',
        // We need to wait for a better times to set "fix" option.
        // Currently it has a lot of issues, especially with .sass files.
        fix: false,
        failOnError: !argv.watch,
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
      }),
      new webpack.HashedModuleIdsPlugin(),
      new WebpackAssetsManifest({
        output: 'manifest.json.php',
        apply(manifest) {
          /* eslint-disable no-param-reassign */
          manifest.toString = () => `<?php return json_decode( '${JSON.stringify(
            manifest,
            manifest.options.replacer,
            manifest.options.space
          ) || '{}'}', true );
`;
        },
        transform(assets) {
          return {
            ...Object.keys(assets).reduce((entries, entry) => {
              if (entry.toLowerCase().endsWith('.map')) {
                return entries;
              }

              return {
                ...entries,
                [entry]: `${config.build.dir}/${assets[entry]}`,
              };
            }, {}),
          };
        },
      }),
      new FriendlyErrorsPlugin({
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
              exclude: externalPackagesRegex,
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
                    name: `[name]${isProd ? '.[hash]' : ''}.[ext]`,
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
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
            priority: -10,
          },
        },
      },
    },
    watchOptions: {
      ignored: externalPackagesRegex,
      poll: 1000,
    },
    externals: {
      jquery: 'jQuery',
    },
  };
};
