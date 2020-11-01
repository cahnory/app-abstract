const path = require('path');

const OUTPUT_PATH = path.resolve(__dirname, 'lib');
const PUBLIC_PATH = path.resolve(OUTPUT_PATH, 'public');
const PUBLIC_ROUTE = '/assets';
const MANIFEST_OUTPUT = 'manifest.json';
const MANIFEST_PATH = path.join(OUTPUT_PATH, MANIFEST_OUTPUT);

module.exports = {
  OUTPUT_PATH,
  PUBLIC_PATH,
  PUBLIC_ROUTE,
  MANIFEST_OUTPUT,
  MANIFEST_PATH,
};
