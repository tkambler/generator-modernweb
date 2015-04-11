var generators = require('yeoman-generator');
var _ = require('lodash');
_.mixin(require('underscore.string'));

module.exports = generators.Base.extend({

    'exec': function() {
    },

    'initializing': function() {
    },

    'prompting': function() {

        var done = this.async();

        this.prompt([
            {
                'type': 'input',
                'name': 'name',
                'message': 'Project Name',
                'default': 'My Project',
                'validate': function(name) {
                    return (name.length > 0);
                }
            },
            {
                'type': 'input',
                'name': 'description',
                'message': 'Project Description',
                'default': 'My awesome project',
                'validate': function(description) {
                    return (description.length > 0);
                }
            },
            {
                'type': 'input',
                'name': 'author',
                'message': 'Project Author',
                'default': 'John Doe',
                'validate': function(author) {
                    return (author.length > 0);
                }
            },
            {
                'type': 'input',
                'name': 'port',
                'message': 'Express Port (> 1024)',
                'default': 7000,
                'validate': function(port) {
                    port = parseInt(port, 10);
                    if (!_.isNaN(port) && port > 1024) return true;
                    return false;
                }
            },
            {
                'type': 'confirm',
                'name': 'confirm',
                'message': function(answers) {
                    return _.sprintf('Project will be created in: %s - Continue?', this.destinationRoot());
                }.bind(this)
            }
        ], function(answers) {

            answers.package_name = _.slugify(answers.name);
            this._answers = answers;

            if (!answers.confirm) process.exit();

            done();

        }.bind(this));

    },

    'configuring': function() {
        console.log('configuring');
    },

    'default': function() {
        console.log('default');
    },

    'writing': function() {

        var data = _.pick(this._answers, ['description', 'name', 'package_name', 'author', 'port']);

        this.fs.copyTpl(
            this.templatePath('public/**/*'),
            this.destinationPath('public'),
            data
        );

        this.fs.copyTpl(
            this.templatePath('Gruntfile.js'),
            this.destinationPath('Gruntfile.js'),
            data
        );

        this.fs.copy(
            this.templatePath('tasks/**/*'),
            this.destinationPath('tasks')
        );

        this.fs.copy(
            this.templatePath('lib/**/*'),
            this.destinationPath('lib')
        );

        this.fs.copy(
            this.templatePath('scss/**/*'),
            this.destinationPath('scss')
        );

        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath('package.json'),
            data
        );

        this.fs.copyTpl(
            this.templatePath('.bowerrc'),
            this.destinationPath('.bowerrc'),
            data
        );

        this.fs.copyTpl(
            this.templatePath('bower.json'),
            this.destinationPath('bower.json'),
            data
        );

    },

    'conflicts': function() {
        // console.log('conflicts');
    },

    'install': function() {

        this.npmInstall([
            'express',
            'lodash',
            'underscore.string',
            'browserify',
            'grunt',
            'grunt-contrib-concat',
            'grunt-contrib-watch',
            'grunt-contrib-compass',
            'grunt-concurrent',
            'bulk-require',
            'brfs',
            'lodash',
            'underscore.string',
            'bulkify',
            'folderify'
        ], {
            'saveDev': false
        });

        this.bowerInstall();

    },

    'end': function() {
        console.log('ending');
    }

});
