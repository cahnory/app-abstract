import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import webAppHandler from './handlers/webApp';
import { IS_DEV, PORT } from './constants';

const server = express()
  /* Request logger */
  .use(morgan(IS_DEV ? 'dev' : 'combined'))
  /* Gzip compression */
  .use(compression())
  /** Web app handler
   *  - render app
   *  - serv static assets
   * */
  .use(webAppHandler)
  .listen(PORT, (err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(`💥  server failed to listen on port ${PORT}: ${err.code}`);
    } else {
      // eslint-disable-next-line no-console
      console.log(`🚀  Server listening on port ${PORT}`);
    }
  });

process.once('SIGUSR2', () => {
  server.close(() => {
    // eslint-disable-next-line no-console
    console.log('😴  server closed');
    process.kill(process.pid, 'SIGUSR2');
  });
  setTimeout(() => {
    // eslint-disable-next-line no-console
    console.log('💀  server killed');
    process.kill(process.pid, 'SIGUSR2');
  }, 5000);
});
