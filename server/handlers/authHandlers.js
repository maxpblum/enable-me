import logging from 'winston'

import {saltAndHash, getNewToken} from '../utils/authUtils'
import {User, Session} from '../models'

const sessionMaxAge = 60 * 60 * 24 * 365

export function signUp(req, res) {
  saltAndHash(req.body.password)
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
      res.status(200).send({user, session})
    })
  )
  .catch(err => {
    logging.error(err)
    res.status(400).send(err)
  })
}
