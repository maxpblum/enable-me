import https from 'https'
import fs from 'fs'
import http from 'http'
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

if (process.env.SSL_KEY && process.env.SSL_CERT) {
  const pkey = fs.readFileSync('./key.pem')
  const pcert = fs.readFileSync('./cert.pem')
  https.createServer({key: pkey, cert: pcert}, app).listen(port)
} else {
  http.createServer(app).listen(port)
}
