exports.up = function (pgm, done) {
  pgm.createTable('todos', {
    id: 'id',
    text: 'varchar(255)'
  });
  done();
};

exports.down = function (pgm, done) {
  pgm.dropTable('todos');
  done();
};
