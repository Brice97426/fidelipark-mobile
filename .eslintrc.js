module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/prop-types': 'off',
    'no-unused-vars': 'warn',
  },
  env: {
    'react-native/react-native': true,
  },
};
