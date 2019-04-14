const path = require('path')

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: {
    newtab: './extension/src/newtab.js',
    popup: './extension/src/popup.js'
  },
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, 'extension', 'public')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
      }
    ]
  }
}
