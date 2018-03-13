const MIN_LENGTH = 3

module.exports = class JobTermsByTitle {
  constructor (jobCrawler, frequencyCalculator) {
    return (req, res, next) => {
      jobCrawler(
        req.params.title,
        req.query.location
      )
        .reduce((jobs, list) => jobs.concat(list.value.items), [])
        .map(jobs => jobs.map(job => job.title + ' ' + job.description))
        .map(terms => terms.map(term => term.replace(/[^a-z0-9#+ ]/gi, '')))
        .map(terms => frequencyCalculator(terms, {minLength: MIN_LENGTH}))
        .subscribe(
          freqs => res.json({items: freqs}),
          err => res.status(err.code || 500).send(err.message),
          () => next()
        )
    }
  }
}
