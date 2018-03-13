const IterableObservable = require('../Observable/IterableObservable')

module.exports = class JobCrawler {
  constructor (jobsByTitleAndLocation) {
    return (title, location) => jobsByTitleAndLocation(title, location)
      .let(IterableObservable.from)
      .iterate()
  }
}
