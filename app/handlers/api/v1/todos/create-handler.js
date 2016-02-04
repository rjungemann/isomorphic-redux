import config from '../../../../../config';

export default function () {
  return (req, res) => {
    const store = req.app.get('store');
    const text = req.body.text;
    const time = req.body.time;

    store.todos.push(text);

    res.json({
      text: text
    });

    // pg.connect(config.databaseUrl, (err, client, done) => {
    //   if (err) {
    //     return console.error('Error fetching client from pool.', err);
    //   }


    //   client.query('INSERT INTO todos (title) VALUES ($1)', [title], (err, result) => {
    //     done();

    //     if (err) {
    //       res
    //         .status(400)
    //         .json({
    //           message: err
    //         });
    //       return console.error('Error inserting todo.', err);
    //     }

    //     res
    //       .json({
    //         message: 'Inserted todo.',
    //         todo: result.rows[0]
    //       });
    //     console.info('Inserted todo.', result.rows[0]);
    //   });
    // });
  };
};
