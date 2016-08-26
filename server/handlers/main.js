import express from 'express'

import {logOut, signUp, getSessionUser} from './authHandlers'
import {indexPage} from './pageHandlers'

export default function attachEndpoints(app) {
  app.set('view engine', 'pug')
  app.use(getSessionUser)
  app.use('/build', express.static('build'))
  app.get('/', indexPage)
  app.post('/users', signUp)
  app.post('/logout', logOut)
}
