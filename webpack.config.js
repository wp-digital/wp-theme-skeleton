let config = require('./config');
let isProd = process.env.NODE_ENV === 'production';

let loaders = [
    {
        loader: 'babel-loader',
        options: {
            presets: [
                ['env', {
                    targets: {
                        browsers: '> 2%'
                    }
                }]
            ],
            plugins: [
                'transform-decorators-legacy',
                'transform-object-rest-spread'
            ],
            env: {
                production: {
                    presets: [
                        ['minify', {
                            mangle: false
                        }]
                    ]
                }
            }
        }
    }
];

if (isProd) {
    loaders.push('eslint-loader');
}

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    output: {
        path: require('path').resolve(config.src.js),
        filename: `common${isProd ? '.min' : ''}.js`
    },
    resolve: {
        extensions: ['.js', '.json', '.css']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: loaders
            }, {
                test: /\.css$/,
                use: 'css-loader'
            }
        ]
    }
};