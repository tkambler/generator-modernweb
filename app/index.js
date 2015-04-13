var generators = require('yeoman-generator');

module.exports = generators.Base.extend({

    'prompting': function() {

        var done = this.async();

        this.prompt([
            {
                'type': 'input',
                'name': 'title',
                'message': 'Project Title',
                'default': 'My Project',
                'validate': function(title) {
                    return (title.length > 0);
                }
            },
            {
                'type': 'input',
                'name': 'package_name',
                'message': 'Package Name',
                'default': 'my-project',
                'validate': function(name) {
                    return (name.length > 0 && /^[a-z0-9\-]+$/i.test(name));
                },
                'filter': function(name) {
                    return name.toLowerCase();
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
                'message': 'Express Port',
                'default': 7000,
                'validate': function(port) {
                    port = parseInt(port, 10);
                    return (!isNaN(port) && port > 0);
                }
            },
            {
                'type': 'confirm',
                'name': 'confirm',
                'message': function(answers) {
                    return 'Project will be created in: ' + this.destinationRoot() + ' - Continue?';
                }.bind(this)
            }
        ], function(answers) {

            this._answers = answers;
            if (!answers.confirm) process.exit();
            done();

        }.bind(this));

    },

    'writing': function() {

        this.fs.copyTpl(
            this.templatePath('**/*'),
            this.destinationPath(),
            this._answers
        );

        this.fs.copyTpl(
            this.templatePath('.bowerrc'),
            this.destinationPath('.bowerrc'),
            this._answers
        );

        this.config.save();

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
            'folderify',
            'grunt-open'
        ], {
            'saveDev': false
        });

        this.bowerInstall();

    },

    'end': function() {
        console.log('Your project is ready.');
    }

});
