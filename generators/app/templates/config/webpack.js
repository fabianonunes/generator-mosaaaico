
var webpackConfig = require('../webpack.config.js'),
    _ = require('underscore')

module.exports = {
  compile : _.assign(webpackConfig, {
    watch: true,
    stats: {
      colors: true,
      modules: true,
      reasons: false
    },
    devtool: 'eval'
  })
}
