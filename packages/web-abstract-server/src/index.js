import express from 'express';
import morgan from 'morgan';
import { PORT, IS_DEV } from './constants';

express()
  /* Request logger */
  .use(morgan(IS_DEV ? 'dev' : 'combined'))
  .listen(PORT, (err) => {
    if (err) {
      console.log(`💥  server failed to listen on port ${PORT}: ${err.code}`);
    } else {
      console.log(`🚀  Server listening on port ${PORT}`);
    }
  });
