module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'no-use-before-define': 'off',
    'sort-imports': ['error', { ignoreDeclarationSort: true }],
  },
  ignorePatterns: ['/lib', 'node_modules'],
};
