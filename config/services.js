const Bottle = require('bottlejs')
const Config = require('./parameters')
const JobsByTitle = require('../src/Controller/Action/JobsByTitle')
const JobTermsByTitle = require('../src/Controller/Action/JobTermsByTitle')
const ErrorHandler = require('../src/Controller/Middleware/ErrorHandler')
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

bottle.service('action__jobs_by_title', JobsByTitle, 'job_crawler')
bottle.service('action__job_terms_by_title', JobTermsByTitle, 'job_crawler', 'term_frequency_calculator')

bottle.service('middleware__error_handler', ErrorHandler)

module.exports = bottle.container
