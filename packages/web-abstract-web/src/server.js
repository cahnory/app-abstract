import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import Document from './Document';
import App from './App';

const getResponse = ({ scripts = [] }) => {
  const body = renderToStaticMarkup(
    <Document body={renderToString(<App />)} scripts={scripts} />,
  );

  return {
    body,
    status: 200,
  };
};

export default getResponse;
