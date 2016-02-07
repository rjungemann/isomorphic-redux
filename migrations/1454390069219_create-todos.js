exports.up = function (pgm, done) {
  pgm.createTable('todos', {
    id: 'id',
    user_id: 'integer',
    text: 'varchar(255)'
  });
  done();
};

exports.down = function (pgm, done) {
  pgm.dropTable('todos');
  done();
};
