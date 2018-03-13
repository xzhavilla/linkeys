const Rx = require('rxjs/Rx')
const ObservableListIterator = require('../Iterator/ObservableListIterator')
const IterableList = require('../Lists/IterableList')

module.exports = class JobsByTitleAndLocationViaApi {
  constructor (apiClient, path) {
    return (title, location) => {
      const getJobs = getJobsByTitleAndLocationViaApi(apiClient, path)(title, location)

      return getJobs()
        .map(list => new ObservableListIterator(
          list => getJobs(list.offset + list.length, list.length),
          list
        ))
    }
  }
}

const getJobsByTitleAndLocationViaApi = (apiClient, path) =>
  (title, location) =>
    (offset = 0, limit = Infinity) => {
      const data = {
        keywords: title,
        location
      }

      if (0 !== offset) {
        data.start = offset
      }

      if (Infinity !== limit) {
        data.count = limit
      }

      if (limit <= 0) {
        return Rx.Observable.of(
          new IterableList()
        )
      }

      return apiClient.get(path, data)
        .map(response => {
          const root = response.decoratedJobPostingsModule
          if (undefined === root) {
            throw new ReferenceError()
          }

          const paging = root.paging

          return new IterableList(
            root.elements.map(({decoratedJobPosting: item}) => ({
              title: item.jobPosting.title,
              company: item.jobPosting.companyName,
              location: item.formattedLocation,
              description: item.formattedDescription,
              date: Math.round(+item.jobPosting.listDate / 1000)
            })),
            +paging.total,
            +paging.start
          )
        })
    }
