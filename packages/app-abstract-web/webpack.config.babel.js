import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { WebpackPluginServe as ServePlugin } from 'webpack-plugin-serve';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import LoadablePlugin from '@loadable/webpack-plugin';
import webpack from 'webpack';

import {
  OUTPUT_PATH,
  PUBLIC_PATH,
  PUBLIC_ROUTE,
  STATS_FILENAME,
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
  devtool: isServer
    ? 'source-map'
    : isDevelopment && 'eval-cheap-module-source-map',
  entry: isServer
    ? {
        server: ['babel-plugin-source-map-support', './src/server'],
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
    devtoolModuleFilenameTemplate: '[resource-path]',
  },
  optimization: {
    ...(isServer
      ? {}
      : {
          moduleIds: 'deterministic',
          runtimeChunk: 'single',
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
        }),
    minimizer: ['...', new CssMinimizerPlugin()],
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
                '@loadable/babel-plugin',
                !isServer && isDevelopment && 'react-refresh/babel',
              ].filter(Boolean),
            },
          },
          {
            loader: 'astroturf/loader',
            options: { extension: '.css' },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]___[hash:base64:8]',
              },
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
    isServer &&
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
    !isServer &&
      new LoadablePlugin({
        filename: STATS_FILENAME,
      }),
    isDevelopment &&
      !isServer &&
      new ServePlugin({
        static: PUBLIC_PATH,
        status: false,
        hmr: true,
      }),
    isDevelopment &&
      !isServer &&
      new ReactRefreshPlugin({
        overlay: {
          sockIntegration: 'wps',
        },
      }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[contenthash].css',
    }),
  ].filter(Boolean),
});
