module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: [
      './tsconfig.eslint.json',
      './packages/**/tsconfig.json',
      './docs/tsconfig.json',
      './docs/tsconfig.node.json',
      './terminals/tsconfig.json',
      './adwaita/tsconfig.json',
    ],
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  overrides: [],
  rules: {
    'node/no-unpublished-import': 'off',
    'node/no-unpublished-require': 'off',
    'node/no-missing-import': 'off',
  },
};
