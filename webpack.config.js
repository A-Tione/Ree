const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './lib/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist/lib'),
        filename: 'index.js',
        library: 'Ree',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Ree',
            template: 'index.html',
        }),
    ],
}