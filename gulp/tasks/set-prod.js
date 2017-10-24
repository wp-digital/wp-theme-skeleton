module.exports = gulp => () => {
    process.env.NODE_ENV = 'production';

    return gulp.src('./');
};