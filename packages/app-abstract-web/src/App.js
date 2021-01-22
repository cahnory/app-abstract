import React from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider } from '@apollo/client';
import loadable from '@loadable/component';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import Error404Page from './pages/Error404Page';

const fallback = 'Page loading…';

const HomePage = loadable(() => import('./pages/HomePage'), { fallback });
const TodoPage = loadable(() => import('./pages/TodoPage'), { fallback });

const App = ({ graphqlClient }) => (
  <ApolloProvider client={graphqlClient}>
    <Helmet htmlAttributes={{ lang: 'en' }}>
      <title>Hello world</title>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, shrink-to-fit=no"
      />
    </Helmet>
    <Switch>
      <Route exact path="/" render={() => <HomePage />} />
      <Route exact path="/todo" render={() => <TodoPage />} />
      <Route
        path="*"
        render={({ staticContext }) => (
          <Error404Page staticContext={staticContext} />
        )}
      />
    </Switch>
  </ApolloProvider>
);

App.propTypes = {
  graphqlClient: PropTypes.object.isRequired,
};

export default App;
