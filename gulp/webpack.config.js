let webpack = require('webpack');
let config = require('./config');
let isProd = process.env.NODE_ENV === 'production';

let loaders = [
    {
        loader: 'babel-loader',
        options: {
            presets: [['es2015', {
                loose: true
            }], 'es2016', 'es2017'],
            plugins: ['transform-decorators-legacy']
        }
    }
];
let plugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.optimize.CommonsChunkPlugin({
        children: true,
        minChunks: 2
    })
];

if (isProd) {
    loaders.push('eslint-loader');
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        comments: false,
        compress: {
            warnings: false
        }
    }));
}

module.exports = {
    output: {
        path: require('path').resolve(config.src.js),
        chunkFilename: `[name]${isProd ? '.min' : ''}.js`,
        filename: `common${isProd ? '.min' : ''}.js`
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
                use: loaders
            }
        ]
    },
    plugins,
    devtool: !isProd ? '#source-map' : false
};