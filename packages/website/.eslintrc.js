module.exports = {
  extends: ['../../.eslintrc.js'],
  globals: {
    React: true,
    JSX: true
  },
  rules: {
    'import/no-unresolved': [2, { 'ignore': ['^@theme', '^@docusaurus', '^@site'] }],
  },
};
