import React from 'react';
import loadable from '@loadable/component';
import { Switch, Route } from 'react-router-dom';
import Error404Page from './pages/Error404Page';

const HomePage = loadable(() => import('./pages/HomePage'), {
  fallback: 'Loading…',
});

const App = ({ Router }) => (
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
);

export default App;
