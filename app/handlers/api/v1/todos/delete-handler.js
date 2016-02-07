import * as Todos from '../../../../models/todos';
import * as Users from '../../../../models/users';

export default function todosDeleteHandler () {
  return (req, res) => {
    Promise
      .resolve(Users.fromToken(req.token))
      .then((user) => {
        return Todos.destroy(user, req.params.id)
      })
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
