module.exports = {
  fontify: {
    files: [{
      expand: true,
      dest: "<%%= config.dist %>/fonts",
      flatten: true,
      src: "node_modules/{<%%= config.fonts.join(\",\") %>}/fonts/*"
    }]
  },
  html: {
    files: [{
      expand: true,
      cwd: "<%%= config.app %>",
      src: "**/*.html",
      dest: "<%%= config.dist %>"
    }]
  },
  js: {
    files: [{
      expand: true,
      cwd: "<%%= config.app %>",
      src: "**/*.js",
      dest: "<%%= config.dist %>"
    }]
  }
}
