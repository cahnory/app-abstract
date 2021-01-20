import { Router, static as Static } from 'express';
import { bundlePath, getResponse, publicPath } from 'app-abstract-web';
import { createClient } from '../utils/graphql';
import { IS_DEV } from '../constants';

const webAppHandler = new Router()
  .use(
    publicPath,
    Static(bundlePath, {
      immutable: !IS_DEV,
      maxAge: IS_DEV ? 0 : 2147483647,
    }),
  )
  .use(async (req, res) => {
    const { status, body, error } = await getResponse({
      url: req.url,
      graphqlClient: createClient({ context: req }),
    });
    error && console.log(error);
    res.status(status).send(body);
  });

export default webAppHandler;
