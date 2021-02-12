const fs = require('fs');
const notifier = require('node-notifier');
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const IgnoreEmitWebpackPlugin = require('ignore-emit-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const StyleLintWebpackPlugin = require('stylelint-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');

const config = require('./config');

const getEntry = (dirs) =>
  dirs.reduce((entry, dir) => {
    const [src, build] = dir;
    const prefix = build.replace(/.*\/([^/]+)$/g, '$1');
    const dirEntries = fs
      .readdirSync(path.resolve(src), {
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

const getOutputPath = (url, resourcePath) => {
  const src = resourcePath
    .replace(`${path.resolve(config.src.dir)}/`, '')
    .split('/');

  if (src.length) {
    src[src.length - 1] = url;
  }

  return src.join('/');
};

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
      [config.src.img, config.build.img],
      [config.src.sass, config.build.css],
      [config.src.sprite, config.build.sprite],
    ]),
    output: {
      filename: `[name]${isProd ? '.[hash].min' : ''}.js`,
      chunkFilename: `[id]${isProd ? '.[chunkhash].min' : ''}.js`,
      path: path.resolve(config.build.dir),
      publicPath: '../',
    },
    resolve: {
      modules: [config.src.dir, 'node_modules'],
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
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: `[name]${isProd ? '.[hash].min' : ''}.css`,
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
        files: path.join(config.src.sass, '**/*.s?(c|a)ss').replace('\\', '/'),
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
      new SpriteLoaderPlugin({
        plainSprite: true,
        spriteAttrs: {
          style: ['position: absolute', 'width: 0', 'height: 0'].join('; '),
        },
      }),
      new webpack.HashedModuleIdsPlugin(),
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
            icon: config.icon,
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
              include: path.resolve(config.src.js),
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
              test: /\.svg$/i,
              include: path.resolve(config.src.sprite),
              use: [
                {
                  loader: 'svg-sprite-loader',
                  options: {
                    extract: true,
                    spriteFilename: `sprite${isProd ? '.[hash]' : ''}.svg`,
                  },
                },
                {
                  loader: 'svgo-loader',
                  options: {
                    plugins: [{ removeViewBox: false }, { cleanupIDs: false }],
                  },
                },
              ],
            },
            {
              test: /\.(gif|png|jpe?g|svg|webp)$/i,
              include: path.resolve(config.src.dir),
              exclude: [
                path.resolve(config.src.sprite),
                path.resolve(config.src.fonts),
              ],
              use: [
                {
                  loader: 'file-loader',
                  options: {
                    outputPath: getOutputPath,
                    name: `[name]${isProd ? '.[hash]' : ''}.[ext]`,
                  },
                },
                {
                  loader: 'image-webpack-loader',
                  options: {
                    mozjpeg: {
                      quality: 75,
                    },
                    pngquant: {
                      quality: [0.75, 0.9],
                      speed: 4,
                    },
                    svgo: {
                      plugins: [
                        { removeViewBox: false },
                        { cleanupIDs: false },
                      ],
                    },
                    gifsicle: {
                      optimizationLevel: 3,
                    },
                  },
                },
              ],
            },
            {
              include: path.resolve(config.src.dir),
              loader: 'file-loader',
              options: {
                outputPath: getOutputPath,
                name: `[name]${isProd ? '.[hash]' : ''}.[ext]`,
              },
            },
          ],
        },
      ],
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'js/vendor',
            chunks: 'all',
            priority: -10,
          },
          common: {
            name: 'js/common',
            chunks: 'all',
            minChunks: 2,
            priority: -20,
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
