import * as Todos from '../../../../models/todos';
import * as Users from '../../../../models/users';

export default function todosUpdateHandler () {
  return (req, res) => {
    Promise
      .resolve(Users.fromToken(req.token))
      .then((user) => {
        return Todos.update(user, req.body.id, req.body.text);
      })
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
