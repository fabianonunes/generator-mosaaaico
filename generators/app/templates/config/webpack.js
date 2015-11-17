
var webpackConfig = require('../webpack.config.js'),
    _ = require('underscore')

module.exports = {
  compile : _.assign(webpackConfig, {
    watch: false
  })
}
