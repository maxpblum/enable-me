function getBundleLocation() {
  if (process.env.NODE_ENV === 'dev') { return '//localhost:8080/bundle.js' }
  return 'build/bundle.js'
}

export const indexPage = (req, res) =>
  res.render('index', {bundleLocation: getBundleLocation()})
