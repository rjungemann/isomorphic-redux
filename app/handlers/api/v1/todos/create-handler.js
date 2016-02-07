import * as Todos from '../../../../models/todos';

export default function () {
  return (req, res) => {
    Todos
      .create(req.body.text)
      .then((todo) => {
        res.json({
          message: 'Created user.',
          todo: todo
        });
      })
      .catch((err) => {
        res
          .status(400)
          .json({
            message: err.message
          });
      });
  };
};
