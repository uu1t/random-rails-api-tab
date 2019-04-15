import { DEFAULT_HISTORY_SIZE, HISTORY_ENTRIES, HISTORY_SIZE } from './constants'

export default class History {
  /**
   * @param {chrome.storage.StorageArea} storage
   */
  constructor(storage = chrome.storage.local) {
    this.storage = storage
  }

  size() {
    return new Promise(resolve => {
      this.storage.get(HISTORY_SIZE, result => {
        resolve(result[HISTORY_SIZE])
      })
    })
  }

  /**
   * @param {Number} value
   */
  setSize(value) {
    return new Promise(resolve => {
      this.storage.set({ [HISTORY_SIZE]: value }, resolve)
    })
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

    const size = result[HISTORY_SIZE] || DEFAULT_HISTORY_SIZE

    /** @type {Array} */
    let entries = result[HISTORY_ENTRIES] || []
    entries = [entry, ...entries].slice(0, size)

    return new Promise(resolve => {
      this.storage.set({ [HISTORY_ENTRIES]: entries }, resolve)
    })
  }
}
