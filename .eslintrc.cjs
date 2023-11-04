module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:storybook/recommended',
  ],

  parserOptions: {
    project: './tsconfig.json',
  },

  plugins: ['react-refresh'],

  rules: {
    'import/prefer-default-export': 'off',
    'import/named': 0,
    'quote-props': ['error', 'consistent-as-needed'],
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],
    'object-shorthand': ['error', 'properties'],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'default-case': ['error'],

    // * React 17 special
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'warn',
    'react/no-unknown-property': ['error', { ignore: ['styleName'] }],

    // * React Rules
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/require-default-props': 'warn',
    '@typescript-eslint/no-unused-vars': ['error'],

    // * CSS specific rules
    'no-restricted-syntax': [
      'error',
      {
        selector:
          'ImportDeclaration[source.value=/.*\\.css/]:matches(!ImportDeclaration[source.value=/.*\\.css/] ~ ImportDeclaration[source.value!=/.*\\.css/])',
        message: 'CSS imports should be after all other imports',
      },
    ],
  },

  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.ts', '.js', '.jsx', '.tsx', '.json'],
      },
    },
  },
};
