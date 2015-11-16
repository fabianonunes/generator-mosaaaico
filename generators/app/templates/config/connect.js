module.exports = {
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
}
