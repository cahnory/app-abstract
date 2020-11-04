const { fork } = require('child_process');
const {
  OUTPUT_PATH,
  PUBLIC_PATH,
  PUBLIC_ROUTE,
  STATS_PATH,
} = require('./constants');

const IS_DEV = process.env.NODE_ENV !== 'production';
const BUNDLE_NOT_BUILT_ERROR = 'BUNDLE_NOT_BUILT';
const SERVER_PATH = `${OUTPUT_PATH}/server`;

const getBundleResolveError = (error) => {
  if (error.code === 'MODULE_NOT_FOUND' || error.code === 'ENOENT') {
    const bundleError = new Error(`Cannot find bundle '${SERVER_PATH}'`);
    bundleError.code = BUNDLE_NOT_BUILT_ERROR;

    return bundleError;
  }

  return error;
};

let getResponse;
if (process.env.NODE_ENV === 'production') {
  try {
    require.resolve(SERVER_PATH);
  } catch (error) {
    throw getBundleResolveError(error);
  }
  // eslint-disable-next-line global-require, import/no-dynamic-require
  getResponse = require(SERVER_PATH).default;
} else {
  const responseProcessPath = require.resolve('./responseProcess');
  getResponse = (options) =>
    new Promise((resolve, reject) => {
      let output;
      const responder = fork(
        responseProcessPath,
        [SERVER_PATH, JSON.stringify(options)],
        {
          silent: true,
          detached: true,
        },
      );

      responder.on('message', (data) => {
        output = data;
      });
      responder.on('exit', (code) => {
        if (code) {
          reject(getBundleResolveError(output.error));
        } else {
          resolve(output.response);
        }
      });
    });
}

module.exports.publicPath = PUBLIC_ROUTE;
module.exports.bundlePath = PUBLIC_PATH;
module.exports.getResponse = async (options = {}) => {
  try {
    return await getResponse({ statsFile: STATS_PATH, ...options });
  } catch (error) {
    return {
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
            ${
              IS_DEV && error
                ? `<pre>${error.message}</pre><pre>${error.stack}</pre>`
                : null
            }
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
    };
  }
};
