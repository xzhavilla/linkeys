module.exports = class ObservableIterator {
  constructor (next, done, value) {
    this._next = next
    this._done = done
    this.value = value
  }

  get done () {
    return this._done(this.value)
  }

  next () {
    return this._next(this.value)
      .map(value => new ObservableIterator(
        this._next,
        this._done,
        value
      ))
  }
}
