import React from 'react';
import PropTypes from 'prop-types';
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

  const Router = ({ children }) => (
    <StaticRouter location={url} context={routerContext}>
      {children}
    </StaticRouter>
  );

  Router.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const appElement = extractor.collectChunks(
    <App graphqlClient={graphqlClient} Router={Router} />,
  );
  await getDataFromTree(appElement);
  const app = renderToString(appElement);
  const initialState = graphqlClient.extract();
  const linkElements = filterHmr(extractor.getLinkElements());
  const styleElements = filterHmr(extractor.getStyleElements());
  const scriptElements = [
    <script
      key="apolloInitialState"
      /* eslint-disable-next-line react/no-danger */
      dangerouslySetInnerHTML={{
        __html: `<!--//--><![CDATA[//><!--
            window.APOLLO_INITIAL_STATE=${JSON.stringify(initialState)};
          //--><!]]>  `,
      }}
    />,
  ].concat(filterHmr(extractor.getScriptElements()));

  response = {
    status: routerContext.status,
    body: `<!DOCTYPE html>\n${renderToStaticMarkup(
      <Document
        lang="fr"
        body={app}
        scriptElements={scriptElements}
        linkElements={linkElements}
        styleElements={styleElements}
        initialState={initialState}
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
