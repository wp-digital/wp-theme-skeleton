let webpack = require('webpack');
let config = require('./config');
let isProd = process.env.NODE_ENV === 'production';

let plugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
];

if (isProd) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compress: {
            warnings: false
        }
    }));
}

module.exports = {
    output: {
        path: require('path').resolve(config.src.js),
        filename: 'common.js'
    },
    externals: {
        jquery: 'jQuery'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['es2015', {
                            loose: true
                        }], 'es2016', 'es2017'],
                        plugins: ['transform-decorators-legacy']
                    }
                }
            }
        ]
    },
    plugins,
    devtool: !isProd ? '#source-map' : false
};