var generators = require('yeoman-generator');

module.exports = generators.NamedBase.extend({

    'constructor': function(args) {
        generators.NamedBase.apply(this, arguments);
        this._routeName = args[0].toLowerCase();
        var projectRoot = process.cwd();
    },

    'writing': function() {

        this.fs.copyTpl(
            this.templatePath('index.js'),
            this.destinationPath('public/app/routes/' + this._routeName + '/index.js'),
            {
                'route': this._routeName
            }
        );

        this.fs.copyTpl(
            this.templatePath('template.html'),
            this.destinationPath('public/app/templates/' + this._routeName + '.html'),
            {
                'route': this._routeName
            }
        );

    },

    'end': function() {
        console.log('Route `' + this._routeName + '` created.');
    }

});
