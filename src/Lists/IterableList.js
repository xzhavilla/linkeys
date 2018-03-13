module.exports = class IterableList {
  constructor (items = [], total = 0, offset = 0) {
    this.items = items
    this.total = total
    this.offset = offset
  }

  [Symbol.iterator] () {
    return this.items
  }

  get length () {
    return this.items.length
  }
}
