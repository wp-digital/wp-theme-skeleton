/* eslint-disable global-require,import/no-extraneous-dependencies */
module.exports = {
  syntax: 'postcss-scss',
  plugins: [
    require('postcss-import'),
    require('postcss-preset-env'),
    require('autoprefixer'),
    require('postcss-nested'),
  ],
};
