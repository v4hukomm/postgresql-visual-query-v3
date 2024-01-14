module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: 'airbnb',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "linebreak-style": 0,
    "arrow-parens": "off",
    "import/prefer-default-export": "off",
    "import/no-named-as-default": 0,
    "import/no-extraneous-dependencies": "off",
    "react/require-default-props": 0,
    "react/function-component-definition": "off",
    "react/jsx-props-no-spreading": "off",
    "react/prop-types": "off",
    "no-shadow": "off",
    "no-param-reassign": "off",
    "no-useless-concat": "off",
    "no-nested-ternary": "off",
    "react/no-array-index-key": "off",
    "no-fallthrough": "off",
    "react/no-children-prop": "off",
    "object-curly-newline": ["off", {
      "ObjectExpression": "always",
      "ObjectPattern": { "multiline": true },
      "ImportDeclaration": "never",
      "ExportDeclaration": { "multiline": true, "minProperties": 3 }
    }],
    "prefer-destructuring": ["error", {"object": true, "array": false}],
    "react/destructuring-assignment": [0, "always", { "ignoreClassFields": false }]
  },
};
