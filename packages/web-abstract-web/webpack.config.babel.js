/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import AssetPlugin from 'assets-webpack-plugin';

const OUTPUT_PATH = path.resolve(__dirname, 'lib');
const PUBLIC_PATH = path.resolve(OUTPUT_PATH, 'public');
const MANIFEST_OUTPUT = 'manifest.json';
const PUBLIC_ROUTE = '/assets';

export default (_, { watch }) => [
  makeConfig({ isServer: false, isDevelopment: watch }),
  makeConfig({ isServer: true, isDevelopment: watch }),
];

const makeConfig = ({ isServer = false, isDevelopment = false }) => ({
  name: isServer ? 'server' : 'client',
  mode: isDevelopment ? 'development' : 'production',
  target: isServer ? 'node' : 'web',
  stats: isServer ? 'minimal' : 'normal',
  entry: isServer
    ? {
        server: ['./src/server'],
      }
    : {
        client: './src/client',
        vendors: ['react', 'react-dom'],
      },
  output: {
    publicPath: `${PUBLIC_ROUTE}/`,
    path: isServer ? OUTPUT_PATH : PUBLIC_PATH,
    libraryTarget: 'umd',
    filename: isServer ? '[name].js' : '[name].[contenthash].js',
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
              emitFile: !isServer,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    !isServer &&
      new AssetPlugin({
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
  ].filter(Boolean),
});
