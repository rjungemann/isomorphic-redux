import express from 'express';
import path from 'path';
import config from '../config'
import webpackDev from '../webpack.dev'
import bodyParser from 'body-parser'

// Handlers
import uiHandler from './handlers/ui-handler'
import todosIndexHandler from './handlers/api/v1/todos/index-handler'
import todosCreateHandler from './handlers/api/v1/todos/create-handler'

const app = express();

if (config.nodeEnv !== 'production') {
  webpackDev(app);
}

app.set('store', {
  todos: ['Foo', 'Bar', 'Baz']
});

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser.json());

// Handle API routes.
app.get('/api/v1/todos', todosIndexHandler());
app.post('/api/v1/todos', todosCreateHandler());

// Handle UI routes.
app.use(uiHandler());

export default app;
