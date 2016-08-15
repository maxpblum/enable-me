import express from 'express'
import session from 'express-session'
import {User} from './models'

const app = express()

function getBundleLocation() {
  if (process.env.NODE_ENV === 'dev') { return '//localhost:8080/bundle.js' }
  return 'build/bundle.js'
}

const indexPage = (req, res) => res.render('index', {bundleLocation: getBundleLocation()})

app.set('view engine', 'pug')
app.use('/build', express.static('build'))
app.get('/', indexPage)

app.listen(process.env.PORT || 3000)
