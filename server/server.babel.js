import express from 'express'
import logging from 'winston'
import bodyParser from 'body-parser'
import bcrypt from 'bcrypt'

import {User} from './models'

const Promise = global.Promise

const app = express()

function getBundleLocation() {
  if (process.env.NODE_ENV === 'dev') { return '//localhost:8080/bundle.js' }
  return 'build/bundle.js'
}

const indexPage = (req, res) => res.render('index', {bundleLocation: getBundleLocation()})

app.set('view engine', 'pug')
app.use(bodyParser.json())
app.use('/build', express.static('build'))
app.get('/', indexPage)
app.post('/users', (req, res) =>
  bcrypt.genSalt(10, (err, salt) =>
    bcrypt.hash(req.body.password, salt, (err, hash) =>
      new Promise((resolve) => {
        if (err) { throw err }
        resolve(User.create({
          name: req.body.username,
          passwordSalt: salt,
          hashedPassword: hash,
        }))
      }).then(user => res.status(200).send(user))
      .catch(err => res.status(400).send(err))
    )
  )
)

const port = process.env.PORT || 3000
logging.info(`Listening on port ${port}`)
app.listen(process.env.PORT || 3000)
