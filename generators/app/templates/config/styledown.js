module.exports = {
  build: {
    files: {
      'styleguide/index.html': ['app/less/**/*.less']
    },
    options: {
      config: 'styleguide/config.md',
      sg_css: 'styleguide/styledown.css',
      sg_js: 'styleguide/styledown.js',
      title: '<%=name%>'
    }
  }
}
