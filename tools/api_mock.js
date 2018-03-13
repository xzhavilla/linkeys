const Api = require('express')()
const Config = require('../config/parameters')

const MIN = 10
const MAX = 100
const COUNT = 25

const totals = []
const getTotal = (title, location) => {
  const key = title + '-' + location
  if (!(key in totals)) {
    totals[key] = Math.max(
      MIN,
      Math.floor(
        MAX * Math.random()
      )
    )
  }

  return totals[key]
}

const getString = () => Math.random().toString(36)

Api.get('/' + Config.api.paths.jobs, ({title, location, ...req}, res) => {
  const total = getTotal(title, location)
  const offset = req.query.start || 0
  const count = req.query.count || COUNT

  return res.json({
    decoratedJobPostingsModule: {
      elements: Array(
        Math.min(
          count,
          total - offset
        )
      )
        .fill(null)
        .map(() => ({
          decoratedJobPosting: {
            jobPosting: {
              title: getString(),
              companyName: getString(),
              listDate: Date.now()
            },
            formattedLocation: getString(),
            formattedDescription: getString()
          }
        })),
      paging: {
        total: total,
        start: offset
      }
    }
  })
})

Api.listen(8080)
