module.exports = {
  options: {
    paths: ['./node_modules'],
    sourceMap: true,
    sourceMapRootpath: '../'
  },
  base: {
    files: [{
      expand: true,
      cwd: '<%%= config.app %>/styles',
      src: '*.less',
      dest: '<%%= config.dist %>/styles',
      ext: '.css'
    }]
  }
}
