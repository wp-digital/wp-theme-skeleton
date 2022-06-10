require('dotenv').config();

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const IgnoreEmitWebpackPlugin = require('ignore-emit-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const StyleLintWebpackPlugin = require('stylelint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const WebpackBuildNotifier = require('webpack-build-notifier');

const config = require('./config');

const getEntry = (dirs) =>
  dirs.reduce((entry, dir) => {
    const [src, build] = dir;
    const prefix = build.replace(/.*\/([^/]+)$/g, '$1');
    const dirEntries = fs
      .readdirSync(path.resolve(__dirname, src), {
        withFileTypes: true,
      })
      .filter((dirent) => !dirent.isDirectory())
      .reduce((entries, file) => {
        if (file.name === '.gitkeep') {
          return entries;
        }

        return {
          ...entries,
          [`${prefix}/${path.parse(file.name).name}`]: path.resolve(
            __dirname,
            src,
            file.name
          ),
        };
      }, {});

    return {
      ...entry,
      ...dirEntries,
    };
  }, {});

const getIgnoreEmitRegex = (dirs) =>
  dirs.map((dir) => {
    const relPath = dir.replace(`${config.build.dir}/`, '');

    return new RegExp(`${relPath}/.+(\\.min)?\\.js(\\.map)?$`);
  });

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';
  const mode = isProd ? 'production' : 'development';

  process.env.BABEL_ENV = mode;
  process.env.NODE_ENV = mode;

  return {
    mode,
    devtool: !isProd ? 'cheap-module-source-map' : 'source-map',
    entry: getEntry([
      [config.src.js, config.build.js],
      [config.src.img, config.build.img],
      [config.src.sass, config.build.css],
      [config.src.sprite, config.build.sprite],
    ]),
    output: {
      chunkFilename: `[id]${isProd ? '.[chunkhash].min' : ''}.js`,
      filename: `[name]${isProd ? '.[contenthash].min' : ''}.js`,
      path: path.resolve(__dirname, config.build.dir),
      publicPath: '../',
      assetModuleFilename: `[name]${
        isProd ? '.[contenthash]' : ''
      }[ext][query]`,
      clean: true,
    },
    resolve: {
      extensions: [
        '.tsx',
        '.ts',
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
      modules: [path.resolve(__dirname, config.src.dir), 'node_modules'],
    },
    plugins: [
      new ESLintPlugin({
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        fix: true,
      }),
      new MiniCssExtractPlugin({
        filename: `[name]${isProd ? '.[contenthash].min' : ''}.css`,
        chunkFilename: `[id]${isProd ? '.[chunkhash].min' : ''}.css`,
      }),
      new IgnoreEmitWebpackPlugin(
        getIgnoreEmitRegex([
          config.build.css,
          config.build.img,
          config.build.sprite,
        ])
      ),
      new StyleLintWebpackPlugin({
        context: path.resolve(__dirname, config.src.sass),
        fix: true,
        failOnError: !argv.watch,
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
      }),
      new SpriteLoaderPlugin({
        plainSprite: true,
        spriteAttrs: {
          style: ['position: absolute', 'width: 0', 'height: 0'].join('; '),
        },
      }),
      new webpack.ids.HashedModuleIdsPlugin(),
      new WebpackAssetsManifest({
        output: 'manifest.json.php',
        apply(manifest) {
          /* eslint-disable no-param-reassign */
          manifest.toString = () => `<?php return json_decode( '${
            JSON.stringify(
              manifest,
              manifest.options.replacer,
              manifest.options.space
            ) || '{}'
          }', true );
`;
        },
        transform(assets) {
          return {
            ...Object.keys(assets).reduce((entries, entry) => {
              const sanitized = entry.toLowerCase();

              if (sanitized.endsWith('.map')) {
                return entries;
              }

              return {
                ...entries,
                [sanitized.startsWith('sprite.')
                  ? 'sprite.svg'
                  : entry]: `${config.build.dir}/${assets[entry]}`,
              };
            }, {}),
          };
        },
      }),
      {
        apply: (compiler) => {
          compiler.hooks.emit.tapAsync(
            'PhpSpriteCopyPlugin',
            (compilation, callback) => {
              const entry = Object.keys(compilation.assets).find((key) =>
                key.toLowerCase().startsWith('sprite.')
              );

              if (entry) {
                compilation.assets[`${entry}.php`] = compilation.assets[entry];
              }

              callback();
            }
          );
        },
      },
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled',
        openAnalyzer: false,
        generateStatsFile: true,
      }),
      Object.prototype.hasOwnProperty.call(process.env, 'WEBPACK_NOTIFY') &&
      JSON.parse(process.env.WEBPACK_NOTIFY)
        ? new WebpackBuildNotifier({
            title: 'Project build',
            logo: config.icon,
            suppressSuccess: false,
            successSound: false,
            failureSound: false,
            warningSound: false,
          })
        : { apply: () => {} },
    ],
    module: {
      rules: [
        {
          oneOf: [
            {
              test: /\.m?(ts|js)x?$/,
              include: path.resolve(__dirname, config.src.js),
              use: ['babel-loader'],
            },
            {
              test: /\.(sa|sc|c)ss$/,
              include: path.resolve(__dirname, config.src.sass),
              use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
                'sass-loader',
              ],
            },
            {
              test: /\.(sa|sc|c)ss$/,
              include: path.resolve(__dirname, config.src.js),
              exclude: /\.module\.(sa|sc|c)ss$/,
              use: [
                isProd ? MiniCssExtractPlugin.loader : 'style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    modules: true,
                  },
                },
                'postcss-loader',
                'sass-loader',
              ],
            },
            {
              test: /\.svg$/i,
              include: path.resolve(__dirname, config.src.sprite),
              use: [
                {
                  loader: 'svg-sprite-loader',
                  options: {
                    extract: true,
                    spriteFilename: `sprite${
                      isProd ? '.[contenthash]' : ''
                    }.svg`,
                  },
                },
              ],
            },
            {
              test: /\.(gif|png|jpe?g|svg|webp)$/i,
              include: path.resolve(__dirname, config.src.dir),
              exclude: [
                path.resolve(__dirname, config.src.sprite),
                path.resolve(__dirname, config.src.fonts),
              ],
              type: 'asset/resource',
            },
            {
              test: /\.json$/i,
              include: path.resolve(__dirname, config.src.dir),
              type: 'asset/source',
            },
            {
              include: path.resolve(__dirname, config.src.dir),
              type: 'asset',
            },
          ],
        },
      ],
    },
    optimization: {
      minimizer: [
        new CssMinimizerPlugin(),
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.imageminMinify,
            options: {
              plugins: [
                [
                  'gifsicle',
                  {
                    interlaced: true,
                    optimizationLevel: 3,
                  },
                ],
                [
                  'mozjpeg',
                  {
                    quality: 75,
                  },
                ],
                [
                  'pngquant',
                  {
                    quality: [0.75, 0.9],
                    speed: 4,
                  },
                ],
                [
                  'svgo',
                  {
                    plugins: [
                      {
                        name: 'preset-default',
                        params: {
                          overrides: {
                            cleanupIDs: false,
                            removeViewBox: false,
                          },
                        },
                      },
                    ],
                  },
                ],
              ],
            },
          },
        }),
        new TerserPlugin(),
      ],
      // @TODO: Enable when needed during optimization.
      // splitChunks: {
      //   cacheGroups: {
      //     vendor: {
      //       test: /[\\/]node_modules[\\/]/,
      //       name: 'js/vendor',
      //       chunks: 'all',
      //       priority: -10,
      //     },
      //     common: {
      //       name: 'js/common',
      //       chunks: 'all',
      //       minChunks: 2,
      //       priority: -20,
      //     },
      //   },
      // },
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
