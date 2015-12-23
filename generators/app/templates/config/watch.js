module.exports = {
  options : {
    spawn: false,
    livereload: '<%%= connect.options.livereload %>'
  },
  gruntfile: {
    files: ['Gruntfile.js']
  },
  less: {
    files: ['<%%= config.app %>/less/{,*/}*.less'],
    tasks: [
      'less',<% if (includeStyledown) { %>
      'styledown',<% } %>
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
  javascript: {
    files: [
      '<%%= config.dist %>/scripts/{,*/}*.js'
    ]
  }
}
