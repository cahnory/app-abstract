import React from 'react';
import { stylesheet } from 'astroturf';
import { Helmet } from 'react-helmet';

const HomePage = () => (
  <div className={styles.page}>
    <Helmet>
      <meta name="description" content="Hello World application" />
    </Helmet>
    Hello World!
  </div>
);

export default HomePage;

const styles = stylesheet`
  .page {
    font-weight: bold;
  }
`;
