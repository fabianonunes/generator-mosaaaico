module.exports = {
  gruntfile: {
    files: ['Gruntfile.js']
  },
  less: {
    files: ['<%%= config.app %>/styles/{,*/}*.less'],
    tasks: [
      'less',
      'autoprefixer'
    ]
  },<% if (includeJade) { %>
  jade: {
      files: ['<%%= config.app %>/**/*.jade'],
      tasks: ['jade']
  },<% } else { %>
  html: {
      files: ['<%%= config.app %>/**/*.html'],
      tasks: ['copy:html']
  },<% } %>
  livereload: {
    options: {
      livereload: '<%%= connect.options.livereload %>'
    },
    files: [
      '<%%= config.dist %>/{,*/}*.html',
      '<%%= config.dist %>/styles/{,*/}*.css'
    ]
  }
}
