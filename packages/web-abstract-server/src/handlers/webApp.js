import { Router, static as Static } from 'express';
import { bundlePath, getResponse, publicPath } from 'web-abstract-web';

const webAppHandler = new Router()
  .use(publicPath, Static(bundlePath))
  .use((req, res) => {
    const response = getResponse();
    res.status(response.status).send(response.body);
  });

export default webAppHandler;
