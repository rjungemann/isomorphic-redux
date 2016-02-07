import * as bcrypt from 'bcrypt';
import pg from 'pg';

import config from '../../../../../config';

export default function () {
  return (req, res) => {
    pg.connect(config.databaseUrl, (err, client, done) => {
      if (err) {
        return console.error('Error fetching client from pool.', err);
      }

      const username = req.body.username;
      const password = req.body.password;

      console.log('username', username, password);

      client.query('SELECT * FROM users WHERE username=$1', [username], (err, result) => {
        done();

        if (err) {
          res
            .status(400)
            .json({
              message: err
            });
          return console.error('Error fetching user.', err);
        }

        const user = result.rows[0];

        console.log('user', user);

        if (!user) {
          return res
            .status(404)
            .json({
              message: 'Could not find user.'
            });
        }

        bcrypt.compare(password, user.encrypted_password, function (err, isMatch) {
          console.log('bcrypt', err, isMatch);

          if (err) {
            res
              .status(400)
              .json({
                message: err
              });
            return console.error('Error checking password.', err);
          }

          if (!isMatch) {
            return res
              .status(404)
              .json({
                message: 'Could not log you in.'
              });
          }

          console.log('Sending...', user);

          res
            .json({
              message: 'Fetched user.',
              user: user
            });
          });
      });
    });
  };
};
