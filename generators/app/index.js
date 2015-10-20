'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  
  prompting: function () {

    var done = this.async();

    this.log(yosay(
      chalk.red('SenadoCss') + '!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'includeSenadoCSS',
      message: 'Deseja incluir o senado.css?',
      default: true
    }];
    
    this.prompt(prompts, function (props) {
      this.includeSenadoCSS = props.includeSenadoCSS;
      done();
    }.bind(this));

  },

  support : function () {

    var done = this.async();

    var prompts = [{
      type: 'checkbox',
      name: 'features',
      message: 'Que recursos você deseja utilizar?',
      choices: [{
        name: 'Bootstrap',
        value: 'includeBootstrap',
        checked: true
      },{
        name: 'Jade',
        value: 'includeJade',
        checked: false
      }]
    }];

    this.prompt(prompts, function (answers) {
      var features = answers.features;

      function hasFeature(feat) {
        return features && features.indexOf(feat) !== -1;
      }

      this.includeBootstrap = hasFeature('includeBootstrap');
      this.includeJade = hasFeature('includeJade');

      done();
    }.bind(this));

  },

  twbsVersion : function () {

    if (this.includeBootstrap) {

      var done = this.async();

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
      }];

      this.prompt(prompts, function (answers) {
        this.bootstrapVersion = answers.bootstrapVersion;
        done();
      }.bind(this));

    }
  },

  twbsRefer : function () {
    if (this.includeBootstrap) {

      var done = this.async();

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
      }];

      this.prompt(prompts, function (answers) {
        this.bootstrapEmbed = answers.bootstrapEmbed;
        done();
      }.bind(this));

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
      this.template('Gruntfile.js');
    },

    app: function () {
      this.template('_package.json', 'package.json');
    },

    git: function () {
      this.template('gitignore', '.gitignore');
      this.copy('gitattributes', '.gitattributes');
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    },

    styles: function () {

      var bootstrapFile;
      
      if (this.includeBootstrap) {
        switch (this.bootstrapVersion) {
          case  "^3.3.5":
            bootstrapFile = "bootstrap3.less"
            break;
          case  "https://github.com/twbs/bootstrap.git#v2.3.2":
            bootstrapFile = "bootstrap2.less"
            break;
        }
        this.fs.copy(
          this.templatePath('app/styles/vendors/' + bootstrapFile),
          this.destinationPath('app/styles/vendors/bootstrap.less')
        );
      }

      if (this.includeSenadoCSS) {
        this.copy('app/styles/vendors/senado.less');
      }
      
      this.copy('app/styles/utils/variables.less');
      this.template('app/styles/main.less');

    },

    scripts: function () {
      this.fs.copy(
        this.templatePath('app/scripts'),
        this.destinationPath('app/scripts')
      );
    },

    html : function () {
      if (this.includeJade) {
        this.template('app/index.jade')
      } else {
        this.template('app/index.html')
      }
    }
  },

  install: function () {
    this.installDependencies();
  }

});
