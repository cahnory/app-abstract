const { watch } = require('fs');
const {
  OUTPUT_PATH,
  PUBLIC_PATH,
  PUBLIC_ROUTE,
  STATS_PATH,
} = require('./constants');

const IS_DEV = process.env.NODE_ENV !== 'production';
const BUNDLE_NOT_BUILT_ERROR = 'BUNDLE_NOT_BUILT';
const SERVER_PATH = `${OUTPUT_PATH}/server`;
let getResponse;

const getErrorResult = (error) => ({
  error,
  status: 500,
  body: `<!DOCTYPE html>
    <html>
      <head>
        <title>500 Internal Server Error</title>
      </head>
      <body>
        <h1>500 Internal Server Error</h1>
        <p>
          Page will refresh in <strong id="time">10 seconds</strong>…
        </p>
        ${IS_DEV && error ? `<pre>${error}</pre>` : null}
        <script>
          var seconds = 10;
          var time = document.getElementById('time');

          setTimeout(location.reload.bind(location), seconds * 1000);
          setInterval(function () {
            seconds = Math.max(seconds - 1, 0);
            time.innerText = seconds + ' second' + (seconds !== 1 ? 's' : '');
          }, 1000);
        </script>
      </body>
    </html>`,
});

const requireBundle = () => {
  try {
    delete require.cache[require.resolve(STATS_PATH)];
    delete require.cache[require.resolve(SERVER_PATH)];
    // eslint-disable-next-line global-require, import/no-dynamic-require
    getResponse = require(SERVER_PATH).default;
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND' || error.code === 'ENOENT') {
      const bundleError = new Error(`Cannot find bundle '${SERVER_PATH}'`);
      bundleError.code = BUNDLE_NOT_BUILT_ERROR;

      throw bundleError;
    }

    throw error;
  }
};

const requireDevelopmentBundle = () => {
  try {
    requireBundle();
  } catch (error) {
    if (error.code === BUNDLE_NOT_BUILT_ERROR) {
      getResponse = () => getErrorResult('The bundle file is missing');
    } else {
      getResponse = () => getErrorResult(error);
    }
  }
};

if (process.env.NODE_ENV === 'production') {
  requireBundle();
} else {
  requireDevelopmentBundle();

  watch(
    __dirname,
    {
      encoding: 'utf8',
      recursive: true,
    },
    requireDevelopmentBundle,
  );
}

module.exports.publicPath = PUBLIC_ROUTE;
module.exports.bundlePath = PUBLIC_PATH;
module.exports.getResponse = async (options = {}) => {
  try {
    const response = await getResponse({
      statsFile: STATS_PATH,
      ...options,
    });
    return response;
  } catch (error) {
    return getErrorResult(error);
  }
};
