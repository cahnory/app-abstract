import { Router, static as Static } from 'express';
import { bundlePath, getResponse, publicPath } from 'app-abstract-web';

const webAppHandler = new Router()
  .use(publicPath, Static(bundlePath))
  .use((req, res) => {
    const { status, body } = getResponse({ url: req.url });
    res.status(status).send(body);
  });

export default webAppHandler;
