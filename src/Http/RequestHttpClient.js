const Request = require('request')
const {Observable} = require('rxjs')

module.exports = class RequestHttpClient {
  get (url, data, config) {
    return request({
      method: 'get',
      url: url,
      qs: data,
      ...config
    })
  }
}

const request = Observable.bindNodeCallback(
  Request,
  (response, body) => {
    const request = response.request
    const level = response.statucCode >= 300 ? 'error' : 'log'
    console[level](`${request.method.toUpperCase()} ${request.href}: ${response.statusCode} ${response.statusMessage}`)

    if (response.statusCode >= 300) {
      const error = new Error(response.statusMessage)
      error.code = response.statusCode

      throw error
    }

    return body
  }
)
