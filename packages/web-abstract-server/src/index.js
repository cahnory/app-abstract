import express from 'express';
import morgan from 'morgan';
import { IS_DEV, PORT } from './constants';

express()
  /* Request logger */
  .use(morgan(IS_DEV ? 'dev' : 'combined'))
  .listen(PORT, (err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(`💥  server failed to listen on port ${PORT}: ${err.code}`);
    } else {
      // eslint-disable-next-line no-console
      console.log(`🚀  Server listening on port ${PORT}`);
    }
  });
