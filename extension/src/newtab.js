import { ORIGIN, DEFAULT_API_VERSION, API_VERSION } from './lib/constants'
import History from './lib/History'

const importMethods = version => {
  switch (version) {
    case 'v5.2':
      return import(/* webpackChunkName: "methods-v5.2" */ '../../data/methods-v5.2.json')
    case 'v5.1':
      return import(/* webpackChunkName: "methods-v5.1" */ '../../data/methods-v5.1.json')
    case 'v5.0':
      return import(/* webpackChunkName: "methods-v5.0" */ '../../data/methods-v5.0.json')
    case 'v4.2':
      return import(/* webpackChunkName: "methods-v4.2" */ '../../data/methods-v4.2.json')
  }
}

;(async () => {
  // Do nothing when accessed by navigating back because iframe is loaded
  if (window.performance.navigation.type === window.performance.navigation.TYPE_BACK_FORWARD) {
    return
  }

  const apiVersion = await new Promise(resolve => {
    chrome.storage.local.get(API_VERSION, result => {
      resolve(result[API_VERSION] || DEFAULT_API_VERSION)
    })
  })

  const methods = (await importMethods(apiVersion)).default

  const i = Math.floor(Math.random() * methods.length)
  const { c, m, h } = methods[i]

  const url = `${ORIGIN}/${apiVersion}/classes/${c.split('::').join('/')}.html#${h}`
  document.getElementById('iframe').setAttribute('src', url)

  const title = `${m} - ${c}`
  document.title = title

  new History().push({ c, m, url })
})()
