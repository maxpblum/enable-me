import {serializeUser} from '../serializers'

function getBundleLocation() {
  if (process.env.NODE_ENV === 'dev') { return '//localhost:8080/bundle.js' }
  return 'build/bundle.js'
}

export const indexPage = (req, res) => {
  const params = {bundleLocation: getBundleLocation()}
  if (req.user) { params.user = serializeUser(req.user) }
  res.render('index', params)
}
