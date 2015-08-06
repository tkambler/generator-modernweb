'use strict';

var fs = require('fs');
var path = require('path');
var src = path.resolve(__dirname, '..', 'app', 'templates', 'package.json.bak');
var target = path.resolve(__dirname, '..', 'app', 'templates', 'package.json');
fs.renameSync(src, target);
