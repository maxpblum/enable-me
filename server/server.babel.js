import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import logging from 'winston'

import attachHandlers from './handlers/main'

const app = express()
app.use(cookieParser())
app.use(bodyParser.json())
attachHandlers(app)

const port = process.env.PORT || 3000
logging.info(`Listening on port ${port}`)
app.listen(process.env.PORT || 3000)
