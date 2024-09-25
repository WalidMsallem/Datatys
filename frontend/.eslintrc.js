module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser for TypeScript
    extends: [
      'eslint:recommended', // Use ESLint recommended rules
      'plugin:@typescript-eslint/recommended', // TypeScript rules
      'plugin:react/recommended', // React-specific rules
    ],
    parserOptions: {
      ecmaVersion: 2021, // Latest ECMAScript standard
      sourceType: 'module', // Allows using import/export
      ecmaFeatures: {
        jsx: true, // Enable JSX parsing
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // No need to import React in scope with React 17+
    //   'semi': ['error', 'always'], // Enforce semicolons
    //   'semi': ['error', 'always'], // Enforce semicolons
      'no-unused-vars': 'warn', // Warn for unused variables
      'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }], // Allow JSX in .tsx files
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Do not require return types for functions
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect the react version
      },
    },
  };
  