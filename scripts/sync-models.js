var argv = require('yargs').argv

require('babel-register')
require('../server/models').sync({force: !!argv.force})
