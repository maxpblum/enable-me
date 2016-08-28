import logging from 'winston'
import {Promise} from 'when'

import {handleUnauthorized, unauthorized, saltAndHash, getNewToken, checkForMatch, badPassword} from '../utils/authUtils'
import {serializeUser} from '../serializers'
import {User, Session} from '../models'

const sessionMaxAge = 60 * 60 * 24 * 365

const validateAuth = req => (req.body.username && req.body.password) ?
    Promise.resolve() : Promise.reject('Username and password required')

const authenticate = ({res, user}) => {
  return getNewToken()
  .then(token => Session.create({token, ttl: sessionMaxAge}))
  .then(session => session.setUser(user))
  .then(session => {
    res.cookie('session', session.token)
    res.cookie('maxAge', sessionMaxAge * 1000)
    res.status(200).send(serializeUser(user))
  })
}

export function signUp(req, res) {
  validateAuth(req)
  .then(() => saltAndHash(req.body.password))
  .then(hash => User.create({
    name: req.body.username,
    hashedPassword: hash,
  }))
  .then(user => authenticate({res, user}))
  .catch(err => {
    logging.error(err)
    return Promise.reject(unauthorized)
  })
  .catch(handleUnauthorized(res))
}

export function logIn(req, res) {
  return validateAuth(req)
  .then(() => User.findOne({where: {name: req.body.username}}))
  .then(user =>
    checkForMatch({hash: user.hashedPassword, password: req.body.password})
    .catch(err => Promise.reject(err === badPassword ? unauthorized : err))
    .then(() => authenticate({res, user}))
  )
  .catch(handleUnauthorized(res))
}

export function logOut(req, res) {
  return (req.cookies.session ? Promise.resolve : Promise.reject)()
  .then(() => Session.destroy({where: {token: req.cookies.session}}))
  .then(() => {
    res.clearCookie('session')
    res.sendStatus(200)
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
