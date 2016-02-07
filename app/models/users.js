import bcrypt from 'bcrypt';
import pg from 'pg';
import Promise from 'bluebird';
import config from '../../config';
import { thirtySix } from '../utils';

export function fromToken (token) {
  return new Promise((resolve, reject) => {
    if (!token || (token.hasOwnProperty('length') && token.length === 0)) {
      return reject(new Error('Token must be provided'));
    }

    pg.connect(config.databaseUrl, (err, client, done) => {
      if (err) {
        return reject(new Error('Error connecting to database.'));
      }

      client.query('SELECT * FROM users WHERE token = $1', [token], (err, result) => {
        done();

        if (err) {
          return reject(new Error('Error fetching user.'));
        }

        if (!result.rows[0]) {
          return reject(new Error('No matching user found.'));
        }

        resolve(result.rows[0]);
      });
    });
  });
}

export function create (username, password, passwordConfirmation) {
  return new Promise((resolve, reject) => {
    pg.connect(config.databaseUrl, (err, client, done) => {
      if (err) {
        return reject(new Error('Error connecting to database.'));
      }

      if (!username || (username.hasOwnProperty('length') && username.length === 0)) {
        return reject(new Error('Username must be provided'));
      }

      if (!password || (password.hasOwnProperty('length') && password.length === 0)) {
        return reject(new Error('Password must be provided.'));
      }

      if (password !== passwordConfirmation) {
        return reject(new Error('Password and confirmation must match.'));
      }

      client.query('SELECT * FROM users WHERE username = $1', [username], (err, result) => {
        done();

        if (err) {
          return reject(new Error('Error fetching user.'));
        }

        if (result.rows[0]) {
          return reject(new Error('User already exists.'));
        }

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
              return reject(new Error('Error creating user.'));
            }

            const token = thirtySix();

            client.query('INSERT INTO users (username, encrypted_password, token) VALUES ($1, $2, $3) RETURNING username, token', [username, hash, token], (err, result) => {
              if (err) {
                return reject(new Error('Error creating user.'));
              }

              resolve(result.rows[0]);
            });
          });
        });
      });
    });
  });
}

export function signin (username, password) {
  return new Promise((resolve, reject) => {
    pg.connect(config.databaseUrl, (err, client, done) => {
      if (err) {
        return reject(new Error('Error connecting to database.'));
      }

      client.query('SELECT * FROM users WHERE username=$1', [username], (err, result) => {
        done();

        if (err) {
          return reject(new Error('Error fetching user.'));
        }

        const user = result.rows[0];
        if (!user) {
          return reject(new Error('Could not find user.'));
        }

        bcrypt.compare(password, user.encrypted_password, function (err, isMatch) {
          if (err) {
            return reject(new Error('Error checking password.'));
          }

          if (!isMatch) {
            return reject(new Error('Could not log you in.'));
          }

          resolve({
            token: user.token,
            username: user.username
          });
        });
      });
    });
  });
}
