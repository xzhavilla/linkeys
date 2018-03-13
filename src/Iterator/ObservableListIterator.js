const ObservableIterator = require('./ObservableIterator')

module.exports = class ObservableListIterator extends ObservableIterator {
  constructor (next, value) {
    super(next, done, value)
  }
}

const done = value => value.offset >= value.total
