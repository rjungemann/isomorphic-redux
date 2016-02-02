import config from '../../../../../config';

console.log(config);

export default function () {
  return (req, res) => {
    var title = req.body.title;

    pg.connect(config.databaseUrl, (err, client, done) => {
      if (err) {
        return console.error('Error fetching client from pool.', err);
      }


      client.query('INSERT INTO todos (title) VALUES ($1)', [title], (err, result) => {
        done();

        if (err) {
          res
            .status(400)
            .json({
              message: err
            });
          return console.error('Error inserting todo.', err);
        }

        res
          .json({
            message: 'Inserted todo.',
            todo: result.rows[0]
          });
        console.info('Inserted todo.', result.rows[0]);
      });
    });
  };
};
