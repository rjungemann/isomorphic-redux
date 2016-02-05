exports.up = function (pgm, done) {
  pgm.createTable('users', {
    id: 'id',
    username: 'varchar(255)',
    encrypted_password: 'varchar(255)',
    token: 'varchar(255)'
  });
  done();
};

exports.down = function (pgm, done) {
  pgm.dropTable('users');
  done();
};
