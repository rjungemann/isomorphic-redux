'use strict';

var register = require('babel-core/register')
var config = require('./config');
var server = require('./app/server');

register({});

server.default.listen(config.port, function () {
  console.log('Server listening on: ' + config.port);
});
