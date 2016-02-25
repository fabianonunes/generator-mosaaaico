/*jshint node:true*/

'use strict';

module.exports = function (grunt) {

    require('load-grunt-config')(grunt, {
      data : {
        app: 'app',
        dist: 'dist',
        fonts: <%= JSON.stringify(importFontsFrom) %>
      }
    })

    grunt.registerTask('dev', '--allow-remote para permitir acesso externo', function (target) {

        if (grunt.option('allow-remote')) {
            grunt.config.set('connect.options.hostname', '0.0.0.0')
        }

        grunt.task.run(['_dev'])

    })

}
