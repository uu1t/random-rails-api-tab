import { h, render, Component } from 'preact'

import {
  DEFAULT_API_VERSION,
  API_VERSIONS,
  DEFAULT_HISTORY_SIZE,
  MAX_HISTORY_SIZE,
  MIN_HISTORY_SIZE,
  API_VERSION,
  HISTORY_SIZE
} from './lib/constants'

class App extends Component {
  componentDidMount() {
    this.props.storage.get([API_VERSION, HISTORY_SIZE], result => {
      this.setState({
        apiVersion: result[API_VERSION],
        historySize: result[HISTORY_SIZE]
      })
    })
  }

  setApiVersion = e => {
    const apiVersion = e.target.value
    this.props.storage.set({ [API_VERSION]: apiVersion }, () => {
      this.setState({ apiVersion })
    })
  }

  setHistorySize = e => {
    const historySize = Math.min(
      Math.max(Math.floor(e.target.value || DEFAULT_HISTORY_SIZE), MIN_HISTORY_SIZE),
      MAX_HISTORY_SIZE
    )
    this.props.storage.set({ [HISTORY_SIZE]: historySize }, () => {
      this.setState({ historySize })
    })
  }

  render(props, { apiVersion = DEFAULT_API_VERSION, historySize = DEFAULT_HISTORY_SIZE }) {
    return (
      <div style={{ padding: '0 1rem 0.6rem' }}>
        <div class="flex three" style={{ alignItems: 'center' }}>
          <label class="two-third">Rails API version</label>
          <div>
            <select onChange={this.setApiVersion} value={apiVersion}>
              {API_VERSIONS.map(version => (
                <option value={version}>{version}</option>
              ))}
            </select>
          </div>
        </div>
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

render(<App storage={chrome.storage.local} />, document.getElementById('app'))
