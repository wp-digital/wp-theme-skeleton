/* eslint import/no-extraneous-dependencies: 0 */
const del = require('del');

module.exports = (gulp, config) => () => del(config.build.dir);
