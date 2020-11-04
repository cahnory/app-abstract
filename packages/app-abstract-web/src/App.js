import React from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider } from '@apollo/client';
import loadable from '@loadable/component';
import { Route, Switch } from 'react-router-dom';
import Error404Page from './pages/Error404Page';

const HomePage = loadable(() => import('./pages/HomePage'), {
  fallback: 'Loading…',
});

const App = ({ Router, graphqlClient }) => (
  <ApolloProvider client={graphqlClient}>
    <Router>
      <Switch>
        <Route exact path="/" render={() => <HomePage />} />
        <Route
          path="*"
          render={({ staticContext }) => (
            <Error404Page staticContext={staticContext} />
          )}
        />
      </Switch>
    </Router>
  </ApolloProvider>
);

App.propTypes = {
  Router: PropTypes.func.isRequired,
  graphqlClient: PropTypes.object.isRequired,
};

export default App;
