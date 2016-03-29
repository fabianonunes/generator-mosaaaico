/*jshint node:true*/

'use strict';

module.exports = function (grunt) {

    require('load-grunt-config')(grunt, {
      data : {
        config: {
          app: 'app',
          dist: 'dist',
          fonts: <%- JSON.stringify(importFontsFrom) %>
        }
      }
    })

    grunt.registerTask('dev', '--allow-remote para permitir acesso externo', function (target) {

        if (grunt.option('allow-remote')) {
            grunt.config.set('connect.options.hostname', '*')
        }

        if (grunt.option('port')) {
            grunt.config.set('connect.options.port', grunt.option('port'))
            grunt.config.set('connect.options.livereload', grunt.option('port') + 500)
        }

        grunt.task.run(['_dev'])

    })

}
