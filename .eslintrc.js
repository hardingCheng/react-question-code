module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint/eslint-plugin'],
  rules: {
    'no-undef': 'off',
    'no-mixed-spaces-and-tabs': 'off',
    '@typescript-eslint/no-explicit-any': ['off'],
  },
}
