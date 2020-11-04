import React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { ChunkExtractor } from '@loadable/server';
import { StaticRouter } from 'react-router-dom';
import Document from './Document';
import App from './App';

const getResponse = async ({ url, statsFile, graphqlClient }) => {
  const routerContext = { status: 200 };
  const extractor = new ChunkExtractor({ statsFile, entrypoints: 'client' });
  let response = {};

  const appElement = extractor.collectChunks(
    <StaticRouter location={url} context={routerContext}>
      <App graphqlClient={graphqlClient} />
    </StaticRouter>,
  );
  await getDataFromTree(appElement);
  const app = renderToString(appElement);
  const initialState = graphqlClient.extract();
  const scriptElements = filterHmr(extractor.getScriptElements());
  const linkElements = filterHmr(extractor.getLinkElements());
  const styleElements = filterHmr(extractor.getStyleElements());

  scriptElements.unshift(
    <script
      key="apolloInitialState"
      /* eslint-disable-next-line react/no-danger */
      dangerouslySetInnerHTML={{
        __html: `<!--//--><![CDATA[//><!--
          window.APOLLO_INITIAL_STATE=${JSON.stringify(initialState)};
        //--><!]]>  `,
      }}
    />,
  );

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
