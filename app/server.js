import express from 'express';
import path from 'path';
import webpackDev from '../webpack.dev';
import bodyParser from 'body-parser';
import session from 'express-session';
import connectRedis from 'connect-redis';
import config from '../config'

// Handlers
import uiHandler from './handlers/ui-handler';
import pingIndexHandler from './handlers/api/v1/ping/index-handler';
import todosIndexHandler from './handlers/api/v1/todos/index-handler';
import todosCreateHandler from './handlers/api/v1/todos/create-handler';
import todosUpdateHandler from './handlers/api/v1/todos/update-handler';
import todosDeleteHandler from './handlers/api/v1/todos/delete-handler';
import usersSigninHandler from './handlers/api/v1/users/signin-handler';
import usersSignoutHandler from './handlers/api/v1/users/signout-handler';
import usersCreateHandler from './handlers/api/v1/users/create-handler';

const app = express();

if (config.nodeEnv !== 'production') {
  webpackDev(app);
}

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(
  session({
    resave: true,
    saveUninitialized: false,
    store: new (connectRedis(session))({
      url: config.redisUrl
    }),
    secret: config.secret
  })
);
app.use(bodyParser.json());

// Handle API routes.
app.get('/api/v1/ping', pingIndexHandler());
app.get('/api/v1/todos', todosIndexHandler());
app.post('/api/v1/todos', todosCreateHandler());
app.put('/api/v1/todos/:id', todosUpdateHandler());
app.delete('/api/v1/todos/:id', todosDeleteHandler());
app.post('/api/v1/users/signin', usersSigninHandler());
app.delete('/api/v1/users/signin', usersSignoutHandler());
app.post('/api/v1/users', usersCreateHandler());

// Handle UI routes.
app.use(uiHandler());

export default app;
