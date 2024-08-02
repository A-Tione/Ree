const path = require('path');

module.exports = {
    entry: {
        index: './lib/index.tsx'
      },
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
      output: {
        path: path.resolve(__dirname, 'dist/lib'),
        library: 'ree',
        libraryTarget: 'umd',
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: 'ts-loader'
          },
          {
            test: /\.svg$/,
            loader: 'svg-sprite-loader',
          },
          {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
          }
        ]
      },
}