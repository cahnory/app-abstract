const { watch } = require('fs');
const {
  OUTPUT_PATH,
  PUBLIC_PATH,
  PUBLIC_ROUTE,
  MANIFEST_PATH,
} = require('./constants');

let manifest;
let getResponse;

if (process.env.NODE_ENV === 'production') {
  try {
    manifest = require(MANIFEST_PATH);
    getResponse = require(`${OUTPUT_PATH}/server`).default;
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      throw new Error('BUNDLE_NOT_BUILT');
    }

    throw error;
  }
} else {
  try {
    manifest = require(MANIFEST_PATH);
    getResponse = require(`${OUTPUT_PATH}/server`).default;
  } catch (error) {
    manifest = { vendors: {}, client: {} };
    getResponse = () => ({
      status: 200,
      body: `<html>
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
        delete require.cache[require.resolve(`${OUTPUT_PATH}/server`)];
        getResponse = require(`${OUTPUT_PATH}/server`).default;
      } catch (erro) {}

      try {
        delete require.cache[require.resolve(MANIFEST_PATH)];
        manifest = require(MANIFEST_PATH);
      } catch (erro) {}
    },
  );
}

module.exports.publicPath = PUBLIC_ROUTE;
module.exports.bundlePath = PUBLIC_PATH;
module.exports.getResponse = () =>
  getResponse({
    scripts: [manifest.vendors.js, manifest.client.js],
  });
