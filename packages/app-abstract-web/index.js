const { watch } = require('fs');
const {
  OUTPUT_PATH,
  PUBLIC_PATH,
  PUBLIC_ROUTE,
  STATS_PATH,
} = require('./constants');

const SERVER_PATH = `${OUTPUT_PATH}/server`;
let getResponse;

if (process.env.NODE_ENV === 'production') {
  try {
    getResponse = require(SERVER_PATH).default;
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND' || error.code === 'ENOENT') {
      throw new Error('BUNDLE_NOT_BUILT');
    }

    throw error;
  }
} else {
  try {
    getResponse = require(SERVER_PATH).default;
  } catch (error) {
    if (error.code !== 'MODULE_NOT_FOUND' && error.code !== 'ENOENT') {
      throw error;
    }

    getResponse = () => ({
      status: 200,
      body: `<!DOCTYPE html>
      <html>
        <head>
          <title>Bundle not built</title>
        </head>
        <body>
          <p>
            Bundle not built, page will refresh in 5 seconds…
          </p>
          <script>setTimeout(location.reload.bind(location), 5000)</script>
        </body>
      </html>`,
    });
  }

  watch(
    __dirname,
    {
      encoding: 'utf8',
      recursive: true,
    },
    () => {
      try {
        delete require.cache[require.resolve(STATS_PATH)];
        delete require.cache[require.resolve(SERVER_PATH)];
        getResponse = require(SERVER_PATH).default;
      } catch (error) {
        if (error.code !== 'MODULE_NOT_FOUND' && error.code !== 'ENOENT') {
          throw error;
        }
      }
    },
  );
}

module.exports.publicPath = PUBLIC_ROUTE;
module.exports.bundlePath = PUBLIC_PATH;
module.exports.getResponse = ({ url }) =>
  getResponse({ url, statsFile: STATS_PATH });
