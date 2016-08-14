import express from 'express'

const app = express()

function getBundleLocation() {
  if (process.env.NODE_ENV === 'dev') { return '//localhost:8080/bundle.js' }
  return 'build/bundle.js'
}

app.set('view engine', 'pug')
app.use('/build', express.static('build'))
app.get('/', (req, res) => {
  res.render('index', {bundleLocation: getBundleLocation()})
})

app.listen(process.env.PORT || 3000)
