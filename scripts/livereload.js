#!/usr/bin/env node

var tinylr = require('tiny-lr');
var port = process.env.TINYLR_PORT || 35729;

tinylr().listen(port, function() {
  console.log('Livereload listening on %s', port);
});
