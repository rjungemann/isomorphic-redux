import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server'
import { RouterContext, match, createMemoryHistory } from 'react-router';
import createLocation from 'history/lib/createLocation';
import routes from './routes';
import { Provider } from 'react-redux';
import promiseMiddleware from './lib/promiseMiddleware';
import fetchComponentData from './lib/fetchComponentData';
import path from 'path';
import configureStore from './configureStore'
import config from '../config'
import webpackDev from '../webpack.dev'
import bodyParser from 'body-parser'

// Handlers
import todosCreateHandler from './handlers/api/v1/todos/create'

const app = express();

if (config.nodeEnv !== 'production') {
  webpackDev(app);
}

app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());

app.use((req, res) => {
  const location = createLocation(req.url);
  const history = createMemoryHistory();
  const store = configureStore(undefined, history);

  match({ routes, location }, (err, redirectLocation, renderProps) => {
    if(err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    if(!renderProps)
      return res.status(404).end('Not found');

    function renderView() {
      const InitialView = (
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );

      const componentHTML = renderToString(InitialView);
      const initialState = store.getState();
      const HTML = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Redux Demo</title>

            <script>
              window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
            </script>
          </head>
          <body>
            <div id="react-view">${componentHTML}</div>
            <script type="application/javascript" src="/bundle.js"></script>
          </body>
        </html>
      `;

      return HTML;
    }

    fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
      .then(renderView)
      .then(html => res.end(html))
      .catch(err => res.end(err.message));
  });
});

app.post('/api/v1/todos', todosCreateHandler());

export default app;
