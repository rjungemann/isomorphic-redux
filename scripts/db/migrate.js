var childProcess = require('child_process');
var config = require('../../config');

var path = __dirname + '/../../node_modules/node-pg-migrate/bin/pg-migrate';

process.env.DATABASE_URL = config.databaseUrl

var isStarted = false;
var args = []
for (var i in process.argv) {
  if (isStarted) {
    args.push(process.argv[i]);
  }

  if (process.argv[i].match(/migrate\.js$/)) {
    isStarted = true;
  }
}

var migrate = childProcess.spawn(path, args, {
  env: process.env
});

migrate.stdout.on('data', function (data) {
  console.info(data.toString());
});

migrate.stderr.on('data', function (data) {
  console.error(data.toString());
});

migrate.on('close', function (code) {
  console.info('Done.');
});
