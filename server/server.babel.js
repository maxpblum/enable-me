import express from 'express'
import logging from 'winston'

import attachEndpoints from './handlers/endpoints'

const app = express()
attachEndpoints(app)

const port = process.env.PORT || 3000
logging.info(`Listening on port ${port}`)
app.listen(process.env.PORT || 3000)
