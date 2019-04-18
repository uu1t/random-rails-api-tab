import { h, render, Component } from 'preact'

import History from './lib/History'

const history = new History()

class App extends Component {
  async componentDidMount() {
    const entries = await history.entries()
    this.setState({ entries })
  }

  clearEntries = async e => {
    await history.clear()
    this.setState({ entries: [] })
  }

  render(props, { entries = [] }) {
    return (
      <div class="card" style={{ border: 'none', margin: 0, minWidth: '240px' }}>
        <header style={{ display: 'flex', alignItems: 'center', padding: '0.6rem 0.8rem' }}>
          <h2 style={{ fontSize: '1.2rem' }}>History</h2>
          <button class="warning" style={{ fontSize: '0.8rem', margin: '0 0 0 auto' }} onClick={this.clearEntries}>
            Clear
          </button>
        </header>
        {entries.length > 0 ? (
          <table style={{ fontSize: '1rem' }}>
            <tbody>
              {entries.map(entry => (
                <tr>
                  <td style={{ paddingRight: '0.6em' }}>
                    <a href={entry.url} target="_blank">
                      {entry.title}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ fontSize: '1rem', padding: '0.6rem 0.8rem' }}>Nothing</div>
        )}
      </div>
    )
  }
}

render(<App />, document.getElementById('app'))
