import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import parser from '@typescript-eslint/parser';

/** @type {import('eslint').Linter.FlatConfig} */
export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['jest.config.js'], // Exclude jest.config.js from linting
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      react: eslintPluginReact,
      'react-hooks': eslintPluginReactHooks,
      'jsx-a11y': eslintPluginJsxA11y,
      import: eslintPluginImport,
      'unused-imports': eslintPluginUnusedImports,
    },
    // All ESLint rules are disabled for this project
    rules: {},
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    ignores: ['postcss.config.js', 'tailwind.config.js', '.next/**', 'eslint.config.js', 'jest.config.js', '*.tsx', '*.ts'],
  },
];