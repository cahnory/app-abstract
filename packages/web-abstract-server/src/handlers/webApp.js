import { Router, static as Static } from 'express';
import { getResponse, manifest } from 'web-abstract-web';

const webAppHandler = new Router()
  .use(manifest.publicPath, Static(manifest.bundlePath))
  .use((req, res) => {
    const response = getResponse();
    res.status(response.status).send(response.body);
  });

export default webAppHandler;
