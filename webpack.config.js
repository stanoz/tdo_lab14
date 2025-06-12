const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: './server.js',
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: 'final.js',
    },
    plugins: [
        new webpack.IgnorePlugin({
            resourceRegExp: /^pg-native$|^cloudflare:sockets$/,
        }),
    ],
    target: 'node',
};

