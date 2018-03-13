const Url = require('url')
const UserAgentGenerator = require('user-agent-string-generator')

module.exports = class LinkedInApiClient {
  constructor (httpClient, config) {
    this.httpClient = httpClient
    this.url = Url.resolve(config.domain || '', config.prefix || '')
  }

  get (path, data = {}) {
    return this.httpClient.get(
      Url.resolve(this.url, path),
      data,
      {
        headers: {
          'user-agent': UserAgentGenerator(),
          accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
          'upgrade-insecure-requests': 1
        },
        gzip: true,
        json: true
      }
    )
  }
}
