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
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'react/jsx-filename-extension': 'off',
    'react/forbid-prop-types': 'off',
    'no-use-before-define': 'off',
    'sort-imports': ['error', { ignoreDeclarationSort: true }],
  },
  ignorePatterns: ['/lib', 'node_modules'],
};
