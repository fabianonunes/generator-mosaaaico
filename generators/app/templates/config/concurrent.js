module.exports = {
  server: [
    'less'
    , 'copy:fontify'<% if (includeJade) { %>
    , 'jade'<% } else { %>
    , 'copy:html'<% } %><% if (includeWebpack) { %>
    , 'webpack'<% } %>
  ]
}
