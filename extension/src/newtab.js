import { ORIGIN } from './lib/constants'
import History from './lib/History'

const methods = require('../../data/default.json')

document.addEventListener('DOMContentLoaded', () => {
  const i = Math.floor(Math.random() * methods.length)
  const { namespace, method, path } = methods[i]
  document.getElementById('iframe').setAttribute('src', ORIGIN + path)
  document.title = `${method} - ${namespace}`
  new History().push({ namespace, method, path })
})
