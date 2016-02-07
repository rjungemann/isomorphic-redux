import * as Users from '../../../../models/users';

export default function () {
  return (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    Users
      .signin(username, password)
      .then((user) => {
        req.session.user = user;
        res
          .json({
            message: 'Successfully signed in.',
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
