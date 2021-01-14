import express from 'express';
import http from 'http';
import https from 'https';
import fs from 'fs';
import app from './app';
import {
  HTTPS_CERT_PATH,
  HTTPS_KEY_PATH,
  PORT,
  UNSECURE_PORT,
} from './constants';

const listen = ({ name = 'server', port, server }) =>
  new Promise((resolve, reject) => {
    server.listen(port, (error) => {
      if (error) {
        // eslint-disable-next-line no-console
        console.log(
          `💥  ${name} failed to listen on port ${port}: ${error.code}`,
        );
        reject(error);
      } else {
        // eslint-disable-next-line no-console
        console.log(`🚀  ${name} listening on port ${port}`);
        resolve(
          () =>
            new Promise((closeResolved) => {
              server.close(() => {
                // eslint-disable-next-line no-console
                console.log(`😴  ${name} stopped listening on port ${port}`);
                closeResolved();
              });
            }),
        );
      }
    });
  });

(async () => {
  let closeHttp;
  let closeHttps;

  process.once('SIGUSR2', async () => {
    setTimeout(() => {
      // eslint-disable-next-line no-console
      console.log('💀  process killed (timeout)');
      process.kill(process.pid, 'SIGUSR2');
    }, 5000);

    await Promise.all([
      closeHttps && closeHttps(),
      closeHttp && closeHttp(),
    ]).catch(() => {});

    process.kill(process.pid, 'SIGUSR2');
  });

  [closeHttp, closeHttps] = await Promise.all([
    listen({
      name: 'HTTP server',
      port: UNSECURE_PORT,
      server: http.createServer(
        express().use((req, res) => {
          let host = `https://${req.get('host').replace(/(?<=:)[0-9]+$/, '')}`;

          if (PORT !== 443) {
            host += `:${PORT}`;
          }

          res.redirect(301, `${host}${req.originalUrl}`);
        }),
      ),
    }),
    listen({
      name: 'HTTPS server',
      port: PORT,
      server: https.createServer(
        {
          key: fs.readFileSync(HTTPS_KEY_PATH),
          cert: fs.readFileSync(HTTPS_CERT_PATH),
        },
        app,
      ),
    }),
  ]);
})();
