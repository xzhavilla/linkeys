module.exports = class JobsByTitle {
  constructor (jobCrawler) {
    return (req, res, next) => {
      jobCrawler(
        req.params.title,
        req.query.location
      )
        .subscribe(
          jobs => res.json({items: jobs}),
          next,
          () => next()
        )
    }
  }
}
