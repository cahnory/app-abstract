/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const schemaString = require('app-abstract-schema');

const graphqlOptions = {
  schemaString,
  env: 'apollo',
};

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier', 'prettier/react'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['graphql', 'react', 'prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'react/jsx-filename-extension': 'off',
    'react/forbid-prop-types': 'off',
    'no-use-before-define': 'off',
    'sort-imports': ['error', { ignoreDeclarationSort: true }],
    'graphql/capitalized-type-name': ['error', graphqlOptions],
    'graphql/named-operations': ['error', graphqlOptions],
    'graphql/no-deprecated-fields': ['warn', graphqlOptions],
    'graphql/required-fields': [
      'error',
      {
        ...graphqlOptions,
        requiredFields: ['uuid'],
      },
    ],
    'graphql/template-strings': ['error', graphqlOptions],
  },
  ignorePatterns: ['/lib', 'node_modules'],
};
