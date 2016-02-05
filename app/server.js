import express from 'express';
import path from 'path';
import config from '../config';
import webpackDev from '../webpack.dev';
import bodyParser from 'body-parser';

// Handlers
import uiHandler from './handlers/ui-handler';
import todosIndexHandler from './handlers/api/v1/todos/index-handler';
import todosCreateHandler from './handlers/api/v1/todos/create-handler';
import todosUpdateHandler from './handlers/api/v1/todos/update-handler';
import todosDeleteHandler from './handlers/api/v1/todos/delete-handler';
import usersSigninHandler from './handlers/api/v1/users/signin-handler';
import usersCreateHandler from './handlers/api/v1/users/create-handler';

global.IS_BROWSER = false;

const app = express();

if (config.nodeEnv !== 'production') {
  webpackDev(app);
}

app.set('store', {
  token: undefined,
  todos: ['Foo', 'Bar', 'Baz']
});

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser.json());

// Handle API routes.
app.get('/api/v1/todos', todosIndexHandler());
app.post('/api/v1/todos', todosCreateHandler());
app.put('/api/v1/todos/:id', todosUpdateHandler());
app.delete('/api/v1/todos/:id', todosDeleteHandler());
app.post('/api/v1/users/signin', usersSigninHandler());
app.post('/api/v1/users', usersCreateHandler());

// Handle UI routes.
app.use(uiHandler());

export default app;
