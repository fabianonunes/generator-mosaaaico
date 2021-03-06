'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({

  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);
    this.argument('installDeps', { type: String, defaults: false })
  },

  prompting: function () {

    this.log(yosay(
      chalk.red('SenadoCss') + '!'
    ))

    var done = this.async()
    this.prompt({
      type    : 'input',
      name    : 'name',
      message : 'Qual o nome do projeto?',
      default : 'design'
    }, function (answers) {
      this.name = answers.name
      done()
    }.bind(this))

  },

  support : function () {

    var done = this.async()

    var prompts = [{
      type: 'checkbox',
      name: 'features',
      message: 'Que recursos você deseja utilizar?',
      choices: [{
        name: 'SenadoCss',
        value: 'includeSenadoCSS',
        checked: true
      },{
        name: 'Bootstrap',
        value: 'includeBootstrap',
        checked: true
      },{
        name: 'Jade',
        value: 'includeJade',
        checked: false
      },{
        name: 'webpack',
        value: 'includeWebpack',
        checked: false
      }]
    }]

    this.prompt(prompts, function (answers) {
      var features = answers.features

      function hasFeature(feat) {
        return features && features.indexOf(feat) !== -1
      }

      this.includeBootstrap = hasFeature('includeBootstrap')
      this.includeJade = hasFeature('includeJade')
      this.includeSenadoCSS = hasFeature('includeSenadoCSS')
      this.includeWebpack = hasFeature('includeWebpack')

      done()
    }.bind(this))

  },

  twbsVersion : function () {

    if (this.includeBootstrap) {

      var done = this.async()

      var prompts = [{
        type: 'list',
        name: 'bootstrapVersion',
        message: 'Qual a versão do Bootstrap?',
        choices: [{
          name: '3.3.x',
          value: '^3.3.5'
        },{
          name: '2.3.x',
          value: 'https://github.com/twbs/bootstrap.git#v2.3.2'
        }],
        default: 0
      }]

      this.prompt(prompts, function (answers) {
        this.bootstrapVersion = answers.bootstrapVersion
        done()
      }.bind(this))

    }
  },

  twbsRefer : function () {
    if (this.includeBootstrap) {

      var done = this.async()

      var prompts = [{
        type: 'list',
        name: 'bootstrapEmbed',
        message: 'Como o bootstrap será usado?',
        choices: [{
          name: 'embutido',
          value: true
        },{
          name: 'referenciado',
          value: false
        }],
        default: 0
      }]

      this.prompt(prompts, function (answers) {
        this.bootstrapEmbed = answers.bootstrapEmbed
        done()
      }.bind(this))

    }
  },

  fonts: function () {
    this.importFontsFrom = []
    if (this.includeSenadoCSS) {
      this.importFontsFrom.push('senado.css')
    }
    if (this.includeBootstrap) {
      this.importFontsFrom.push('bootstrap')
    }
  },

  writing: {

    gruntfile: function () {

      this.template('Gruntfile.js')

      this.template('grunt/aliases.yaml')
      this.template('grunt/autoprefixer.js')
      this.template('grunt/clean.js')
      this.template('grunt/concurrent.js')
      this.template('grunt/connect.js')
      this.template('grunt/copy.js')
      this.template('grunt/cssmin.js')
      this.template('grunt/less.js')
      this.template('grunt/watch.js')

      if (this.includeWebpack) {
        this.template('grunt/webpack.js')
        this.template('webpack.config.js')
      }
      if (this.includeJade) {
        this.template('grunt/jade.js')
      }

    },

    app: function () {
      this.template('_package.json', 'package.json')
    },

    git: function () {
      this.template('gitignore', '.gitignore')
      this.copy('gitattributes', '.gitattributes')
    },

    styles: function () {

      var bootstrapFile

      if (this.includeBootstrap) {
        switch (this.bootstrapVersion) {
          case  '^3.3.5':
            bootstrapFile = 'bootstrap3.less'
            break
          case  'https://github.com/twbs/bootstrap.git#v2.3.2':
            bootstrapFile = 'bootstrap2.less'
            break
        }
        this.template(
          'app/less/vendors/' + bootstrapFile,
          'app/less/vendors/bootstrap.less'
        )
      }

      if (this.includeSenadoCSS) {
        this.copy('app/less/vendors/senado.less')
      }

      this.copy('app/less/utils/variables.less')
      this.template('app/less/main.less')

    },

    scripts: function () {
      this.directory(this.includeWebpack ? 'app/modules' : 'app/scripts')
    },

    assets: function () {
      this.directory('app/assets')
    },

    html : function () {
      if (this.includeJade) {
        this.template('app/index.jade')
        this.template('app/senado.jade')
      } else {
        this.template('app/index.html')
      }
    }
  },

  install: function () {
    if (this.installDeps !== 'noinstall') {
      this.npmInstall()
    }
  }

})
