import { ORIGIN } from './lib/constants'
import History from './lib/History'

const methods = require('../../data/methods-v5.2.json')

document.addEventListener('DOMContentLoaded', () => {
  const i = Math.floor(Math.random() * methods.length)
  const { c, m, h } = methods[i]

  const url = `${ORIGIN}/classes/${c.split('::').join('/')}.html#${h}`
  document.getElementById('iframe').setAttribute('src', url)

  const title = `${m} - ${c}`
  document.title = title

  new History().push({ title, url })
})
