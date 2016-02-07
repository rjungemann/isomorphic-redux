import * as Users from '../../../../models/users';

export default function () {
  return (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const passwordConfirmation = req.body.password_confirmation;

    Users
      .create(username, password, passwordConfirmation)
      .then((user) => {
        req.session.user = user;
        res
          .json({
            message: 'Created user.',
            user: user
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
