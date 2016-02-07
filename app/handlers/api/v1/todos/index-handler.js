import * as Todos from '../../../../models/todos';
import * as Users from '../../../../models/users';

export default function todosIndexHandler () {
  return (req, res) => {
    Promise
      .resolve(Users.fromToken(req.token))
      .then((user) => {
        return Todos.all(user)
      })
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
