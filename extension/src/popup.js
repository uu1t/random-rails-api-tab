import { app } from 'hyperapp'
import { a, button, div, h4, header, table, tbody, td, tr } from '@hyperapp/html'

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
  div({ class: 'card', style: 'border: none; margin: 0; min-width: 240px;' }, [
    header({ style: 'display: flex; align-items: center;' }, [
      h4('History'),
      button({ class: 'warning', style: 'font-size: 0.8rem; margin: 0 0 0 auto;', onclick: clear }, 'Clear')
    ]),
    entries.length > 0
      ? table(
          { style: 'font-size: 1rem;' },
          tbody(
            entries.map(entry =>
              tr([td({ style: 'padding-right: 0.6em;' }, a({ href: entry.url, target: '_blank' }, entry.title))])
            )
          )
        )
      : div({ style: 'font-size: 1rem; padding: 0.6em;' }, 'Nothing')
  ])

document.addEventListener('DOMContentLoaded', async () => {
  const entries = await history.entries()
  app({ entries }, actions, view, document.getElementById('app'))
})
