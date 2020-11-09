import React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { ChunkExtractor } from '@loadable/server';
import { StaticRouter } from 'react-router-dom';
import Document from './Document';
import App from './App';

const getResponse = ({ url, statsFile }) => {
  const routerContext = { status: 200 };
  const extractor = new ChunkExtractor({ statsFile, entrypoints: 'client' });
  let response = {};

  const app = renderToString(
    extractor.collectChunks(
      <StaticRouter location={url} context={routerContext}>
        <App />
      </StaticRouter>,
    ),
  );
  const scriptElements = filterHmr(extractor.getScriptElements());
  const linkElements = filterHmr(extractor.getLinkElements());
  const styleElements = filterHmr(extractor.getStyleElements());

  response = {
    status: routerContext.status,
    body: `<!DOCTYPE html>\n${renderToStaticMarkup(
      <Document
        body={app}
        scriptElements={scriptElements}
        linkElements={linkElements}
        styleElements={styleElements}
      />,
    )}`,
  };

  return response;
};

export default getResponse;

const filterHmr = (list) =>
  list.filter(
    (element) =>
      !element.props.src?.match(/wps-hmr\.[^.\\/]+$/) &&
      !element.props.href?.match(/wps-hmr\.[^.\\/]+$/),
  );
