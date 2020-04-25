module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': 'off',
    'no-console': 'off',
    'no-new': 'off',
    'max-len': 'off',
    'no-lonely-if': 'off',
    'no-plusplus': 'off',
    'no-extend-native': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
