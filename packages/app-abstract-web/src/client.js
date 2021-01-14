import React from 'react';
import { hydrate } from 'react-dom';
import { loadableReady } from '@loadable/component';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const serviceWorkerPath = require.resolveWeak('./serviceWorker.js');

loadableReady(() =>
  hydrate(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('root'),
  ),
);

console.log(serviceWorkerPath, global);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(serviceWorkerPath, {
        scope: '/',
      })
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
