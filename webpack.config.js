const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: {
    newtab: './extension/src/newtab.js',
    popup: './extension/src/popup.js',
    vendor: './node_modules/picnic/picnic.min.css'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: MiniCssExtractPlugin.loader }, { loader: 'css-loader' }]
      }
    ]
  },
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, 'extension', 'public')
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]-bundle.css'
    })
  ]
}
