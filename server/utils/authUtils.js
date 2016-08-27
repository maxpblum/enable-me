import crypto from 'crypto'

import bcrypt from 'bcrypt'
import {Promise} from 'when'

export const badPassword = new Error('Password did not match')

export const checkForMatch = ({password, hash}) =>
  new Promise((resolve, reject) =>
    bcrypt.compare(password, hash, (err, res) =>
      err ? reject(err) :
        res ? resolve() : reject(badPassword)))

const hash = ({salt, password}) =>
  new Promise((resolve, reject) =>
    bcrypt.hash(password, salt, (err, hash) =>
      err ? reject(err) : resolve(hash)
    )
  )

export const saltAndHash = password =>
  new Promise((resolve, reject) =>
    bcrypt.genSalt(10, (err, salt) =>
      err ? reject(err) : resolve({password, salt})
    )
  ).then(hash)

export const getNewToken = () => new Promise(
  (resolve, reject) =>
    crypto.randomBytes(256, (err, buf) =>
      err ? reject(err) :
      resolve(buf.toString('hex')))
)
