module.exports = ({ file, env }) => ({
  plugins: {
    'postcss-import': {
      root: file.dirname,
    },
    'postcss-preset-env': true,
    cssnano: env === 'production',
  },
});
