import * as Todos from '../../../../models/todos';

export default function todosIndexHandler () {
  return (req, res) => {
    Todos
      .all()
      .then((todos) => {
        res.json({
          message: 'Fetched todos.',
          todos: todos
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
}
