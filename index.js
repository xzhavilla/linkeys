const Api = require('express')()
const Container = require('./config/services')

Api.get('/jobs/:title', Container.action__jobs_by_title)
Api.get('/jobs/:title/terms', Container.action__job_terms_by_title)

Api.use(Container.middleware__error_handler)

Api.listen(8080)
