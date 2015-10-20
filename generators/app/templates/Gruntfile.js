/*jshint node:true*/

'use strict';

module.exports = function (grunt) {

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

    var config = {
        app: 'app',
        dist: 'dist',
        fonts: <%= JSON.stringify(importFontsFrom) %>
    };

    grunt.initConfig({

        config: config,

        less: {
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
        },

        autoprefixer: {
            options: {
                browsers: ['> 1%', 'last 2 versions', 'ie 9'],
                map: true
            },
            base: {
                files: [{
                    expand: true,
                    cwd: '<%%= config.dist %>/styles',
                    src: '{,*/}*.css',
                    dest: '<%%= config.dist %>/styles'
                }]
            }
        },

        cssmin: {
            options : {
                keepSpecialComments: 0
            },
            dist: {
                files: [{
                    expand: true,
                    src: '<%%= config.dist %>/styles/*.css'
                }]
            }
        },

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [ '<%%= config.dist %>' ]
                }]
            }
        },

        <% if (includeJade) { %>
        jade: {
            main: {
                options: {
                    pretty: true
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: '<%%= config.app %>/*.jade',
                    dest : '<%%= config.dist %>',
                    ext: '.html'
                }]
            }
        },
        <% }%>

        watch: {
            
            gruntfile: {
                files: ['Gruntfile.js']
            },

            less: {
                files: ['<%%= config.app %>/styles/{,*/}*.less'],
                tasks: ['less', 'autoprefixer']
            },
            
            <% if (includeJade) { %>
            jade: {
                files: ['<%%= config.app %>/*.jade'],
                tasks: ['jade']
            },
            <% } else { %>
            html: {
                files: ['<%%= config.app %>/**/*.html'],
                tasks: ['copy:html']
            },
            <% } %>

            livereload: {
                options: {
                    livereload: '<%%= connect.options.livereload %>'
                },
                files: [
                    '<%%= config.dist %>/{,*/}*.html',
                    '<%%= config.dist %>/styles/{,*/}*.css',
                ]
            }

        },

        connect: {
            options: {
                port: 8000,
                livereload: 35729,
                hostname: 'localhost'
            },
            dev: {
                options: {
                    middleware: function(connect, options, middlewares) {
                        
                        middlewares.unshift(function(req, res, next) {
                            res.setHeader('Access-Control-Allow-Origin', '*');
                            res.setHeader('Access-Control-Allow-Methods', '*');
                            next();
                        });
                        
                        var serveStatic = require('serve-static');
                        middlewares.unshift(serveStatic("dist"))

                        return middlewares;

                    }
                }
            },
            dist: {
                options: {
                    base: '<%%= config.dist %>',
                    livereload: false
                }
            }
        },

        copy: {
            fontify: {
                files: [{
                    expand: true,
                    dest: '<%%= config.dist %>/fonts',
                    flatten: true,
                    src: 'node_modules/{<%%= config.fonts.join(",") %>}/fonts/*'
                }]
            },
            html: {
                files: [{
                    expand: true,
                    cwd: '<%%= config.app %>',
                    src: '**/*.html',
                    dest: '<%%= config.dist %>'
                }]
            }
        },

        concurrent: {
            server: [
                'less', 'copy:fontify' <% if (includeJade) { %>, 'jade'<% } else { %>, 'copy:html'<% } %>
            ]
        }

    });

    grunt.registerTask('dev', '--allow-remote para permitir acesso externo', function (target) {

        if (grunt.option('allow-remote')) {
            grunt.config.set('connect.options.hostname', '0.0.0.0');
        }
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean',
            'concurrent',
            'autoprefixer',
            'connect:dev',
            'watch'
        ]);

    });

    grunt.registerTask('build', [
        'clean',
        'concurrent',
        'autoprefixer',
        'copy',
    ]);

    grunt.registerTask('default', [
        'build'
    ]);

};
