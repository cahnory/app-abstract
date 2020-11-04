import { Router, static as Static } from 'express';
import { bundlePath, getResponse, publicPath } from 'app-abstract-web';
import { createClient } from '../utils/graphql';

const webAppHandler = new Router()
  .use(publicPath, Static(bundlePath))
  .use(async (req, res) => {
    try {
      const { status, body, error } = await getResponse({
        url: req.url,
        graphqlClient: createClient({ context: req }),
      });
      res.status(status).send(body);
      if (status === 500) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send();
    }
  });

export default webAppHandler;
