const SERVER_PATH = process.argv[2];
const SERVER_OPTIONS = JSON.parse(process.argv[3] || '{}');

const handleError = ({ code, message, stack }) => {
  process.send({ error: { code, message, stack } });
  process.exit(1);
};

try {
  require.resolve(SERVER_PATH);
} catch (error) {
  handleError(error);
}

try {
  process.send({ response: require(SERVER_PATH).default(SERVER_OPTIONS) });
} catch (error) {
  handleError(error);
}
