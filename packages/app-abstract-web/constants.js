const path = require('path');

const OUTPUT_PATH = path.resolve(__dirname, 'lib');
const PUBLIC_PATH = path.resolve(OUTPUT_PATH, 'public');
const PUBLIC_ROUTE = '/assets';
const STATS_FILENAME = '../loadable-stats.json';
const STATS_PATH = path.resolve(PUBLIC_PATH, STATS_FILENAME);

module.exports = {
  OUTPUT_PATH,
  PUBLIC_PATH,
  PUBLIC_ROUTE,
  STATS_FILENAME,
  STATS_PATH,
};
