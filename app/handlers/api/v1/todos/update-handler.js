import * as Todos from '../../../../models/todos';

export default function todosUpdateHandler () {
  return (req, res) => {
    Todos
      .update(req.body.id, req.body.text)
      .then((todo) => {
        res.json({
          message: 'Updated todo.',
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
  }
}
