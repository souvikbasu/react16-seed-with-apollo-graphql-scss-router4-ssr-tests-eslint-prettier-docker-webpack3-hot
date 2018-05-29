import React from 'react';
import { renderToString } from 'react-dom/server';
import fs from 'fs';

// Apollo
import fetch from 'node-fetch';
import { ApolloClient } from 'apollo-client';
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import merge from 'lodash.merge';

import { StaticRouter } from 'react-router';
import logger from '../logger';

import App from '../components/App';
import appSettings from 'appSettings';
import user from '../models/user';

const renderServer = (req, res) => {
  logger.info('Original req: ' + req.originalUrl);
  logger.info('Cookies on server side: ' + req.headers.cookie);

  const cache = new InMemoryCache();
  const client = new ApolloClient({
    ssrMode: true,
    cache: cache,
    link: withClientState({
      ...merge(user),
      cache
    }).concat(
      new HttpLink({
        uri: appSettings.apiEndpoints.graphql,
        fetch: fetch
      })
    )
  });

  logger.info('GraphQL url: ' + appSettings.apiEndpoints.graphql);

  const context = {};

  const app = (
    <ApolloProvider client={client}>
      <StaticRouter
        location={req.url}
        context={context}
        basename={appSettings.serverFolder}
      >
        <App />
      </StaticRouter>
    </ApolloProvider>
  );

  const reactApp = renderToString(app);
  const initialState = client.extract();
  let indexHtml = fs.readFileSync('./index.html');
  indexHtml = indexHtml
    .toString()
    .replace('<div id="root"></div>', `<div id="root">${reactApp}</div>`);

  indexHtml = indexHtml.replace(
    'window.__APOLLO_STATE__={}',
    `window.__APOLLO_STATE__=${JSON.stringify(initialState).replace(
      /</g,
      '\\u003c'
    )};`
  );

  logger.info('returning HTML: ' + indexHtml);

  res.send(indexHtml);
};

export default renderServer;
