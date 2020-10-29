import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import Document from './Document';
import App from './App';

export const manifest = __non_webpack_require__('./manifest.json');

export const getResponse = () => {
  const body = renderToStaticMarkup(
    <Document
      body={renderToString(<App />)}
      scripts={[manifest.assets.vendors.js, manifest.assets.client.js]}
    />,
  );

  return {
    body,
    status: 200,
  };
};

export default getResponse;
