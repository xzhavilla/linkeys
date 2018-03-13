module.exports = class IterableObservable {
  static from (observable) {
    return Object.assign(
      Object.create(observable),
      observable,
      {iterate: iterate(observable)}
    )
  }
}

const iterate = observable => () => observable
  .expand(iterator => iterator.next())
  .takeWhile(iterator => !iterator.done)
