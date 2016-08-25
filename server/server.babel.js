import express from 'express'
import logging from 'winston'

const app = express()

function getBundleLocation() {
  if (process.env.NODE_ENV === 'dev') { return '//localhost:8080/bundle.js' }
  return 'build/bundle.js'
}

const indexPage = (req, res) => res.render('index', {bundleLocation: getBundleLocation()})

app.set('view engine', 'pug')
app.use('/build', express.static('build'))
app.get('/', indexPage)
app.post('/some-endpoint', (req, res) => res.send('it worked!'))

const port = process.env.PORT || 3000
logging.info(`Listening on port ${port}`)
app.listen(process.env.PORT || 3000)
