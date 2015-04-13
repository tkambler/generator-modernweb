var generators = require('yeoman-generator');

module.exports = generators.Base.extend({

    'prompting': function() {

        var done = this.async();

        this.prompt([
            {
                'type': 'input',
                'name': 'route',
                'message': 'Route Name - e.g. \'users\'',
                'validate': function(route) {
                    return (route.length > 0 && /^[a-z0-9\-]+$/i.test(route));
                }
            }
        ], function(answers) {
            this._answers = answers;
            done();
        }.bind(this));

    },

    'writing': function() {

        this.fs.copyTpl(
            this.templatePath('index.js'),
            this.destinationPath('public/app/routes/' + this._answers.route + '/index.js'),
            this._answers
        );

        this.fs.copyTpl(
            this.templatePath('template.html'),
            this.destinationPath('public/app/routes/' + this._answers.route + '/template.html'),
            this._answers
        );

    },

    'end': function() {
        console.log('Route `' + this._answers.route + '` created.');
    }

});
