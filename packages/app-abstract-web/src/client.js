import React from 'react';
import { hydrate } from 'react-dom';
import { loadableReady } from '@loadable/component';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

loadableReady(() =>
  hydrate(<App Router={BrowserRouter} />, document.getElementById('root')),
);
