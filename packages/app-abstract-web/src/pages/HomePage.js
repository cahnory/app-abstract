import React from 'react';
import { stylesheet } from 'astroturf';

const HomePage = () => <div className={styles.page}>Hello World!</div>;

export default HomePage;

const styles = stylesheet`
  .page {
    font-weight: bold;
  }
`;
