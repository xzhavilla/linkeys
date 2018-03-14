const Http = require('http')

module.exports = class ErrorHandler {
  constructor () {
    return (err, req, res, next) => {
      if (res.headersSent) {
        return next(err)
      }

      switch (typeof err) {
        case 'number':
          err = {code: err}
          break
        case 'string':
          err = {message: err}
          break
        case 'object':
          if (err instanceof Error) {
            console.error(err)
            err.message = null
          }
          break
      }

      const code = err.code || 500
      res.status(code).json({
        errors: err.message || Http.STATUS_CODES[code]
      })
    }
  }
}
