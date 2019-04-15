import { app } from 'hyperapp'
import { div, input, label } from '@hyperapp/html'

import { DEFAULT_HISTORY_SIZE, MAX_HISTORY_SIZE, MIN_HISTORY_SIZE, HISTORY_SIZE } from './lib/constants'
import History from './lib/History'

const history = new History()

const actions = {
  setHistorySize: value => state => {
    const historySize = Math.min(
      Math.max(Math.floor(value || DEFAULT_HISTORY_SIZE), MIN_HISTORY_SIZE),
      MAX_HISTORY_SIZE
    )
    history.setSize(historySize)
    return {
      historySize
    }
  }
}

const view = ({ historySize }, { setHistorySize }) =>
  div({ style: 'padding: 0 1rem 0.25rem;' }, [
    div({ class: 'flex three', style: 'align-items: center;' }, [
      label({ class: 'two-third', for: HISTORY_SIZE }, `History size (${MIN_HISTORY_SIZE}-${MAX_HISTORY_SIZE})`),
      div([
        input({
          id: HISTORY_SIZE,
          max: MAX_HISTORY_SIZE,
          min: MIN_HISTORY_SIZE,
          onchange: e => setHistorySize(e.target.value),
          placeholder: DEFAULT_HISTORY_SIZE,
          type: 'number',
          value: historySize
        })
      ])
    ])
  ])

document.addEventListener('DOMContentLoaded', async () => {
  const historySize = (await history.getSize()) || DEFAULT_HISTORY_SIZE
  app({ historySize }, actions, view, document.getElementById('app'))
})
