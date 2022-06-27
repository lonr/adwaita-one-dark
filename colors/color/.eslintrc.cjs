// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-config/patch/modern-module-resolution');

module.exports = {
  extends: [
    '@rushstack/eslint-config/profile/node-trusted-tool',
    '@rushstack/eslint-config/mixins/friendly-locals'
  ],
  parserOptions: { tsconfigRootDir: __dirname },
  ignorePatterns: ['node_modules/', 'lib/'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    // use a simpler naming convention
    // https://typescript-eslint.io/rules/naming-convention/#enforce-the-codebase-follows-eslints-camelcase-conventions
    // https://github.com/microsoft/rushstack/blob/1c8020f6cb23b5bf3506ea25de757163aa5641b0/eslint/eslint-config/profile/_common.js#L208
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: 'default',
        format: ['camelCase']
      },

      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE']
      },
      {
        selector: 'parameter',
        format: ['camelCase'],
        leadingUnderscore: 'allow'
      },

      {
        selector: 'memberLike',
        modifiers: ['private'],
        format: ['camelCase'],
        leadingUnderscore: 'require'
      },

      {
        selector: 'typeLike',
        format: ['PascalCase']
      }
    ]
  }
};
