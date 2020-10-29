/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import WebpackAssetPlugin from 'assets-webpack-plugin';

const OUTPUT_PATH = path.resolve(__dirname, 'lib');
const PUBLIC_PATH = path.resolve(OUTPUT_PATH, 'public');
const MANIFEST_OUTPUT = 'manifest.json';
const PUBLIC_ROUTE = '/assets';

export default (_, { watch, mode = watch ? 'development' : 'production' }) => {
  const server = makeConfig({
    name: 'server',
    target: 'node',
    path: OUTPUT_PATH,
    entry: {
      server: ['./src/server'],
    },
    libraryTarget: 'umd',
    emitFile: false,
    stats: 'minimal',
  });

  const client = makeConfig({
    name: 'client',
    path: PUBLIC_PATH,
    entry: {
      client: './src/client',
      vendors: ['react', 'react-dom'],
    },
    filename: '[name].[contenthash].js',
    plugins: [
      new WebpackAssetPlugin({
        filename: MANIFEST_OUTPUT,
        path: OUTPUT_PATH,
        prettyPrint: true,
        fullPath: true,
        processOutput: (assets) => {
          return JSON.stringify(
            {
              publicPath: PUBLIC_ROUTE,
              bundlePath: PUBLIC_PATH,
              assets,
            },
            null,
            2,
          );
        },
      }),
    ],
  });

  return [client, server];
};

const makeConfig = ({
  mode,
  path: outputPath,
  filename,
  name,
  target,
  entry,
  libraryTarget,
  stats,
  emitFile,
  plugins,
}) => ({
  mode,
  name,
  target,
  entry,
  plugins,
  stats,
  output: {
    publicPath: `${PUBLIC_ROUTE}/`,
    path: outputPath,
    libraryTarget,
    filename,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[contenthash].[ext]',
              emitFile,
            },
          },
        ],
      },
    ],
  },
});
