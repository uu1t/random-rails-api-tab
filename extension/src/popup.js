import { app, h } from 'hyperapp'

import { ORIGIN } from './lib/constants'
import History from './lib/History'

const history = new History()

const actions = {
  clear: () => () => {
    history.clear()
    return { entries: [] }
  }
}

const view = ({ entries }, { clear }) =>
  h('div', { class: 'card', style: 'border: none; margin: 0; min-width: 240px;' }, [
    h('header', { style: 'display: flex; align-items: center;' }, [
      h('h4', {}, 'History'),
      h('button', { class: 'warning', style: 'font-size: 0.8rem; margin: 0 0 0 auto;', onclick: clear }, 'Clear')
    ]),
    entries.length > 0
      ? h(
          'table',
          { style: 'font-size: 1rem;' },
          h(
            'tbody',
            {},
            entries.map(entry =>
              h(
                'tr',
                {},
                h(
                  'td',
                  { style: 'padding-right: 0.6em;' },
                  h('a', { href: ORIGIN + entry.path, target: '_blank' }, `${entry.method} - ${entry.namespace}`)
                )
              )
            )
          )
        )
      : h('div', { style: 'font-size: 1rem; padding: 0.6em;' }, 'Nothing')
  ])

document.addEventListener('DOMContentLoaded', async () => {
  const entries = await history.entries()
  app({ entries }, actions, view, document.getElementById('app'))
})
