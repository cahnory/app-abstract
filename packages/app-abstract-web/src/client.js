import React from 'react';
import { hydrate } from 'react-dom';
import { loadableReady } from '@loadable/component';
import { BrowserRouter } from 'react-router-dom';
import { graphqlClient } from './utils/graphql';
import App from './App';

loadableReady(() =>
  hydrate(
    <BrowserRouter>
      <App graphqlClient={graphqlClient} />
    </BrowserRouter>,
    document.getElementById('root'),
  ),
);
