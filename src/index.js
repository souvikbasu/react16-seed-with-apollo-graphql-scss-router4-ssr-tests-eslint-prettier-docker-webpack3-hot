import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import merge from 'lodash.merge';

import appSettings from 'appSettings';
import './index.scss';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import user from './models/user';
import logger from './logger';

logger.info(`Preloaded state: ${JSON.stringify(window.__APOLLO_STATE__)}`);

const client = new ApolloClient({
  uri: appSettings.apiEndpoints.graphql,
  clientState: {
    ...merge(user),
    cache: new InMemoryCache().restore(window.__APOLLO_STATE__)
  }
});

ReactDOM.hydrate(
  <ApolloProvider client={client}>
    <BrowserRouter basename={appSettings.serverFolder}>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);
registerServiceWorker();
