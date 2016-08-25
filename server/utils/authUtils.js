import crypto from 'crypto'

import bcrypt from 'bcrypt'

const Promise = global.Promise

export const saltAndHash = password =>
  new Promise((resolve, reject) =>
    bcrypt.genSalt(10, (err, salt) =>
      err ? reject(err) :
      bcrypt.hash(password, salt, (err, hash) =>
        err ? reject(err) : resolve({salt, hash})
      )
    )
  )

export const getNewToken = () => new Promise(
  (resolve, reject) =>
    crypto.randomBytes(256, (err, buf) =>
      err ? reject(err) :
      resolve(buf.toString('hex')))
)
