import * as bcrypt from 'bcrypt';
import pg from 'pg';

import config from '../../../../../config';
import { thirtySix } from '../../../../utils';

export default function () {
  return (req, res) => {
    pg.connect(config.databaseUrl, (err, client, done) => {
      if (err) {
        return console.error('Error fetching client from pool.', err);
      }

      const username = req.body.username;
      const password = req.body.password;
      const passwordConfirmation = req.body.password_confirmation;

      if (!username || (username.hasOwnProperty('length') && username.length === 0)) {
        return res
          .status(400)
          .json({
            message: 'Username must be provided.'
          });
      }

      if (!password || (password.hasOwnProperty('length') && password.length === 0)) {
        return res
          .status(400)
          .json({
            message: 'Password must be provided.'
          });
      }

      if (password !== passwordConfirmation) {
        return res
          .status(400)
          .json({
            message: 'Password and password confirmation must match.'
          });
      }

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

        if (user) {
          return res
            .status(400)
            .json({
              message: 'User already exists.'
            });
        }

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
              res
                .status(400)
                .json({
                  message: err
                });
              return console.error('Error generating salt.', err);
            }

            const token = thirtySix();

            client.query('INSERT INTO users (username, encrypted_password, token) VALUES ($1, $2, $3)', [username, hash, token], (err, result) => {
              if (err) {
                res
                  .status(400)
                  .json({
                    message: err
                  });
                return console.error('Error creating user.', err);
              }

              client.query('SELECT username, token FROM users WHERE username=$1', [username], (err, result) => {
                if (err) {
                  res
                    .status(400)
                    .json({
                      message: err
                    });
                  return console.error('Error fetching user after create.', err);
                }

                console.log(result.rows[0]);

                res
                  .json({
                    message: 'Created user.',
                    user: result.rows[0]
                  });
                });
              });
          });
        });
      });
    });
  };
};
