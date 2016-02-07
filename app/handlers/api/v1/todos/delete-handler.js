import * as Todos from '../../../../models/todos';

export default function todosDeleteHandler () {
  return (req, res) => {
    Todos
      .destroy(req.params.id)
      .then(() => {
        res.json({
          message: 'Destroyed todo.'
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
