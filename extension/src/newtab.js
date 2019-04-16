import { ORIGIN } from './lib/constants'
import History from './lib/History'

const methods = require('../../data/default.json')

document.addEventListener('DOMContentLoaded', () => {
  const i = Math.floor(Math.random() * methods.length)
  const { namespace, method, path } = methods[i]
  const url = ORIGIN + path
  document.getElementById('iframe').setAttribute('src', url)
  const title = `${method} - ${namespace}`
  document.title = title
  new History().push({ title, url })
})
