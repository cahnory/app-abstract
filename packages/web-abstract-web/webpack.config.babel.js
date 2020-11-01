/* eslint-disable import/no-extraneous-dependencies */
import AssetPlugin from 'assets-webpack-plugin';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { WebpackPluginServe as ServePlugin } from 'webpack-plugin-serve';

import {
  OUTPUT_PATH,
  PUBLIC_PATH,
  PUBLIC_ROUTE,
  MANIFEST_OUTPUT,
} from './constants';

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
        client: [
          isDevelopment && 'webpack-plugin-serve/client',
          './src/client',
        ].filter(Boolean),
      },
  output: {
    publicPath: `${PUBLIC_ROUTE}/`,
    path: isServer ? OUTPUT_PATH : PUBLIC_PATH,
    libraryTarget: 'umd',
    filename: isServer ? '[name].js' : '[name].[contenthash].js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                !isServer && isDevelopment && 'react-refresh/babel',
              ].filter(Boolean),
            },
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
    isDevelopment &&
      !isServer &&
      new ServePlugin({
        static: PUBLIC_PATH,
        status: false,
        hmr: true,
        historyFallback: true,
      }),
    isDevelopment &&
      !isServer &&
      new ReactRefreshPlugin({
        overlay: {
          sockIntegration: 'wps',
        },
      }),
    !isServer &&
      new AssetPlugin({
        filename: MANIFEST_OUTPUT,
        path: OUTPUT_PATH,
        prettyPrint: true,
        fullPath: true,
      }),
  ].filter(Boolean),
});
