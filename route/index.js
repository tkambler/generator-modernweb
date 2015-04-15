var generators = require('yeoman-generator');

module.exports = generators.NamedBase.extend({

    'constructor': function(args) {
        this._opts = {
            'route': args[0]
        };
        generators.NamedBase.apply(this, arguments);
    },

    'writing': function() {

        this.fs.copyTpl(
            this.templatePath('index.js'),
            this.destinationPath('public/app/routes/' + this._opts.route + '/index.js'),
            this._opts
        );

        this.fs.copyTpl(
            this.templatePath('template.html'),
            this.destinationPath('public/app/routes/' + this._opts.route + '/template.html'),
            this._opts
        );

    },

    'end': function() {
        this.log('Route `' + this._opts.route + '` created.');
    }

});
