import { HISTORY_ENTRIES, HISTORY_SIZE } from './constants'

export default class History {
  /**
   * @param {chrome.storage.StorageArea} storage
   */
  constructor(storage = chrome.storage.local) {
    this.storage = storage
  }

  clear() {
    return new Promise(resolve => {
      this.storage.set({ [HISTORY_ENTRIES]: [] }, resolve)
    })
  }

  entries() {
    return new Promise(resolve => {
      this.storage.get(HISTORY_ENTRIES, result => {
        resolve(result[HISTORY_ENTRIES])
      })
    })
  }

  /**
   * @param {Object} entry
   */
  async push(entry) {
    const result = await new Promise(resolve => {
      this.storage.get([HISTORY_ENTRIES, HISTORY_SIZE], resolve)
    })

    // TODO: make size configurable
    const size = result[HISTORY_SIZE] || 100

    /** @type {Array} */
    let entries = result[HISTORY_ENTRIES] || []
    entries = [entry, ...entries].slice(0, size)

    return new Promise(resolve => {
      this.storage.set({ [HISTORY_ENTRIES]: entries }, resolve)
    })
  }
}
