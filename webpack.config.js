const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: {
    newtab: './extension/src/newtab.js',
    options: './extension/src/options.js',
    popup: './extension/src/popup.js',
    vendor: './node_modules/picnic/picnic.min.css'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-proposal-class-properties',
              ['@babel/plugin-transform-react-jsx', { pragma: 'h' }]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [{ loader: MiniCssExtractPlugin.loader }, { loader: 'css-loader' }]
      }
    ]
  },
  output: {
    filename: '[name]-bundle.js',
    chunkFilename: '[name]-bundle.js',
    path: path.resolve(__dirname, 'extension', 'public')
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]-bundle.css'
    })
  ]
}
