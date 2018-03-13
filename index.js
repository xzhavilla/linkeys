const Api = require('express')()
const Container = require('./config/services')

Api.get('/jobs/:title/terms', Container.action__job_terms_by_title)

Api.listen(8080)
