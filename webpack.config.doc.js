const base = require('./webpack.config.js');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = Object.assign({}, base, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'doc'),
    },
    entry: {
        example: './example.tsx',
    },
    plugins: [
        new htmlWebpackPlugin({
            title: 'Ree',
            template: 'example.html',
        })
    ]
});