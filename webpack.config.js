const path = require('path')

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: {
    newtab: './extension/src/newtab.js'
  },
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, 'extension', 'public')
  }
}