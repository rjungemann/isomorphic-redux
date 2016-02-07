import createLocation from 'history/lib/createLocation';
import React from 'react';
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux';
import { RouterContext, match, createMemoryHistory } from 'react-router';
import configureStore from '../configure-store'
import fetchComponentData from '../lib/fetch-component-data';
import routes from '../routes';
import immutifyState from '../lib/immutify-state';

export default function uiHandler () {
  return (req, res) => {
    const location = createLocation(req.url);
    const history = createMemoryHistory();
    const initialState = immutifyState({
      user: req.session.user,
      todos: undefined
    });
    const store = configureStore(initialState, history);

    match({ routes, location }, (err, redirectLocation, renderProps) => {
      if(err) {
        console.error(err);
        return res.status(500).end('Internal server error');
      }

      if(!renderProps) {
        return res.status(404).end('Not found');
      }

      function renderView() {
        const InitialView = (
          <Provider store={store}>
            <RouterContext {...renderProps}/>
          </Provider>
        );

        const componentHTML = renderToString(InitialView);
        const initialState = store.getState();

        return `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">

              <title>Isomorphic Redux</title>

              <link rel="stylesheet" href="/stylesheets/tether.min.css">
              <link rel="stylesheet" href="/stylesheets/bootstrap.min.css">
              <link rel="stylesheet" href="/stylesheets/main.css">

              <script>document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')</script>

              <script src="/javascripts/jquery.min.js"></script>
              <script src="/javascripts/tether.min.js"></script>
              <script src="/javascripts/bootstrap.min.js"></script>

              <script>
                window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
              </script>
            </head>

            <body>
              <main>${componentHTML}</main>
              <script type="application/javascript" src="/bundle.js"></script>
            </body>
          </html>
        `;
      }

      fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
        .then(renderView)
        .then(html => res.end(html))
        .catch(err => res.end(err.message));
    });
  };
}
