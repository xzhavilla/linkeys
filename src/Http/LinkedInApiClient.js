const Url = require('url')
const UserAgentGenerator = require('user-agent-string-generator')

module.exports = class {
  constructor (request, config) {
    this.request = request
    this.url = Url.resolve(config.domain || '', config.prefix || '')
  }

  get (path, data = {}) {
    return this.request({
      method: 'get',
      url: Url.resolve(this.url, path),
      qs: data,
      headers: {
        'user-agent': UserAgentGenerator(),
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'upgrade-insecure-requests': 1
      },
      gzip: true,
      json: true
    })
  }
}
