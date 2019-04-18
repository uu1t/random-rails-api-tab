import { h, render, Component } from 'preact'

import { DEFAULT_HISTORY_SIZE, MAX_HISTORY_SIZE, MIN_HISTORY_SIZE } from './lib/constants'
import History from './lib/History'

const history = new History()

class App extends Component {
  async componentDidMount() {
    const historySize = await history.size()
    this.setState({ historySize })
  }

  setHistorySize = async e => {
    const historySize = Math.min(
      Math.max(Math.floor(e.target.value || DEFAULT_HISTORY_SIZE), MIN_HISTORY_SIZE),
      MAX_HISTORY_SIZE
    )
    await history.setSize(historySize)
    this.setState({ historySize })
  }

  render(props, { historySize = DEFAULT_HISTORY_SIZE }) {
    return (
      <div style={{ padding: '0 1rem 0.6rem' }}>
        <div class="flex three" style={{ alignItems: 'center' }}>
          <label class="two-third" for="history-size">
            History size ({MIN_HISTORY_SIZE}-{MAX_HISTORY_SIZE})
          </label>
          <div>
            <input
              id="history-size"
              max={MAX_HISTORY_SIZE}
              min={MIN_HISTORY_SIZE}
              onChange={this.setHistorySize}
              placeholder={DEFAULT_HISTORY_SIZE}
              type="number"
              value={historySize}
            />
          </div>
        </div>
      </div>
    )
  }
}

render(<App />, document.getElementById('app'))
