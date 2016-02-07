import Promise from 'bluebird';
import * as Todos from '../../../../models/todos';
import * as Users from '../../../../models/users';

export default function () {
  return (req, res) => {
    const text = req.body.text;

    Promise
      .resolve(Users.fromToken(req.token))
      .then((user) => {
        return Todos.create(user, text)
      })
      .then((todo) => {
        res.json({
          message: 'Created todo.',
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
