let del = require('del');

module.exports = (gulp, config) => () => del(config.build.dir);