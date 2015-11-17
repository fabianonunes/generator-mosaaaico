
var webpack = require('webpack')

module.exports = {
    entry: {
        '<%=name%>': ['main']
    },
    output: {
        path: __dirname + '/app/scripts',
        filename: '[name].min.js'
    },
    externals: {
      jquery : 'jQuery'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel',  query: { presets: ['es2015']} },
            { test: /\.hbs$/, loader: 'handlebars-loader' },
            { test: /\.mustache$/, loader: 'mustache-loader?minify' }
        ]
    },
    resolve: {
        modulesDirectories: [
            'node_modules',
            __dirname + '/app/scripts'
        ],
        alias: {
            'hogan.js' : 'hogan.js/lib/template',
            'handlebars' : 'handlebars/runtime',
        }
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            mangle: true,
            output: {
                comments: false
            },
            compress : {
                warnings: false
            }
        })
    ]
}
