import pg from 'pg';
import Promise from 'bluebird';
import config from '../../config';

export function all () {
  return new Promise((resolve, reject) => {
    pg.connect(config.databaseUrl, (err, client, done) => {
      if (err) {
        return reject(new Error('Error connecting to database.'));
      }

      client.query('SELECT * FROM todos', [], (err, result) => {
        if (err) {
          return reject(new Error('Error fetching todos.', err));
        }

        resolve(result.rows);
      });
    });
  });
}

export function create (text) {
  return new Promise((resolve, reject) => {
    pg.connect(config.databaseUrl, (err, client, done) => {
      if (err) {
        return reject(new Error('Error connecting to database.'));
      }

      if (!text || (text.hasOwnProperty('length') && text.length === 0)) {
        return reject(new Error('Text must be provided.'));
      }

      client.query('INSERT INTO todos (text) VALUES ($1) RETURNING *', [text], (err, result) => {
        if (err) {
          return reject(new Error('Error creating todo.'));
        }

        resolve(result.rows[0]);
      });
    });
  });
}

export function update(id, text) {
  return new Promise((resolve, reject) => {
    pg.connect(config.databaseUrl, (err, client, done) => {
      if (err) {
        return reject(new Error('Error connecting to database.'));
      }

      if (!id || (id.hasOwnProperty('length') && id.length === 0)) {
        return reject(new Error('ID must be provided.'));
      }

      if (!text || (text.hasOwnProperty('length') && text.length === 0)) {
        return reject(new Error('Text must be provided.'));
      }

      client.query('UPDATE todos SET text = $1 WHERE id = $2 RETURNING *', [text, id], (err, result) => {
        if (err) {
          return reject(new Error('Error udpating todo.'));
        }

        resolve(result.rows[0]);
      });
    });
  });
}

export function destroy (id) {
  return new Promise((resolve, reject) => {
    pg.connect(config.databaseUrl, (err, client, done) => {
      if (err) {
        return reject(new Error('Error connecting to database.'));
      }

      if (!id || (id.hasOwnProperty('length') && id.length === 0)) {
        return reject(new Error('ID must be provided.'));
      }

      client.query('DELETE FROM todos WHERE id = $1', [id], (err, result) => {
        if (err) {
          return reject(new Error('Error destroying todo.'));
        }

        resolve();
      });
    })
  });
}
