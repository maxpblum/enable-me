import express from 'express'
import bodyParser from 'body-parser'

import {signUp} from './authHandlers'
import {indexPage} from './pageHandlers'

export default function attachEndpoints(app) {
  app.set('view engine', 'pug')
  app.use(bodyParser.json())
  app.use('/build', express.static('build'))
  app.get('/', indexPage)
  app.post('/users', signUp)
}
