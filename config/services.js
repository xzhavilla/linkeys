const Bottle = require('bottlejs')
const Config = require('./parameters')
const JobTermsByTitle = require('../src/Action/JobTermsByTitle')
const LinkedInApiClient = require('../src/Http/LinkedInApiClient')
const RequestHttpClient = require('../src/Http/RequestHttpClient')
const JobsByTitleAndLocationViaApi = require('../src/QueryFunction/JobsByTitleAndLocationViaApi')
const JobCrawler = require('../src/Services/JobCrawler')
const TermFrequencyCalculator = require('../src/Services/TermFrequencyCalculator')

const bottle = new Bottle()

bottle.service('http__client__request', RequestHttpClient)

bottle.factory('http__api__linkedin', container => (
  new LinkedInApiClient(container.http__client__request, Config.api)
))

bottle.factory('query_function__jobs_by_title_and_location_via_api', container => (
  new JobsByTitleAndLocationViaApi(container.http__api__linkedin, Config.api.paths.jobs)
))

bottle.service('job_crawler', JobCrawler, 'query_function__jobs_by_title_and_location_via_api')

bottle.service('term_frequency_calculator', TermFrequencyCalculator)

bottle.service('action__job_terms_by_title', JobTermsByTitle, 'job_crawler', 'term_frequency_calculator')

module.exports = bottle.container
