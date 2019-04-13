const methods = require('../../data/default.json')

const origin = 'https://api.rubyonrails.org'

document.addEventListener('DOMContentLoaded', () => {
  const i = Math.floor(Math.random() * methods.length)
  const { namespace, method, path } = methods[i]
  document.getElementById('iframe').setAttribute('src', origin + path)
  document.title = `${method} - ${namespace}`
})
