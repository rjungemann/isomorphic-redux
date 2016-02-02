var pg = require('pg');
var config = require('../../config');
var connectionString = config.databaseUrl.replace(/\w+?$/, 'template1');
var dbname = config.databaseUrl.match(/(\w+?)$/)[1];

pg.connect(connectionString, function (err, client, done) {
  if (err) {
    return console.error('Error fetching client from pool.', err);
  }

  console.info('Opened database connection.');

  client.query('DROP DATABASE ' + dbname, function (err, result) {
    client.end();

    if (err && err.message.match(/does not exist/)) {
      return console.info('Database does not exist.', dbname);
    }

    if (err) {
      return console.error('Error creating database.', dbname, err);
    }

    console.info('Dropped database.');
  });
});
