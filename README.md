# generator-modernweb

A Yeoman generator for a project based on Angular, Browserify, and Grunt, among other tools. Used as example for the book [Pro JavaScript Frameworks for Modern Web Development](http://www.amazon.com/Pro-JavaScript-Frameworks-Modern-Development/dp/1484206630).

If you have not already installed Yeoman, do so:

```
$ npm install -g yo
```

Install the `generator-modernweb` Yeoman generator and create your first project:

```
$ npm install -g generator-modernweb
$ mkdir myapp && cd myapp
$ yo modernweb
```

Build your new project and launch and instance of Express to serve it with:

```
$ grunt
```

New Angular routes can be created with the following Yeoman subcommand:

```
// e.g.: yo modernweb:route users
$ yo modernweb:route {path}
```
