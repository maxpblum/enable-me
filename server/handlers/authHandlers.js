import logging from 'winston'

import {saltAndHash, getNewToken} from '../utils/authUtils'
import {serializeUser} from '../serializers'
import {User, Session} from '../models'

const Promise = global.Promise

const sessionMaxAge = 60 * 60 * 24 * 365

export function signUp(req, res) {
  new Promise((resolve, reject) =>
    (req.body.username && req.body.password) ?
      resolve() : reject('Username and password required'))
  .then(() => saltAndHash(req.body.password))
  .then(({salt, hash}) => User.create({
    name: req.body.username,
    passwordSalt: salt,
    hashedPassword: hash,
  }))
  .then(user =>
    getNewToken()
    .then(token => Session.create({token, ttl: sessionMaxAge}))
    .then(session => session.setUser(user))
    .then(session => {
      res.cookie('session', session.token)
      res.cookie('maxAge', sessionMaxAge * 1000)
      res.status(200).send(serializeUser(user))
    })
  )
  .catch(err => {
    logging.error(err)
    res.status(400).send(err)
  })
}

export function logOut(req, res) {
  new Promise((resolve, reject) =>
    req.cookies.session ? resolve() : reject())
  .then(() => Session.destroy({where: {token: req.cookies.session}}))
  .then(() => {
    res.clearCookie('session')
    res.send(200)
  })
}

export const getSessionUser = (req, res, next) => {
  const token = req.cookies.session
  if (token) {
    Session.findOne({where: {token}, include: [User]})
    .then(({user}) => {
      req.user = user
      next()
    })
  }
  else { next() }
}
