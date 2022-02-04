module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
    "cypress/globals": true,
  },
  extends: [
    "plugin:react/jsx-runtime",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
    "airbnb",
    "prettier",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react", "jest", "cypress"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],

      extends: ["plugin:@typescript-eslint/recommended"],

      parserOptions: {
        project: ["./tsconfig.json"], // Specify it only for TypeScript files
      },
    },
  ],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/prop-types": 0,
    "react/jsx-props-no-spreading": 0,
    "react/function-component-definition": 0,

    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double", { avoidEscape: true }],
    semi: ["error", "always"],
    "max-len": [
      2,
      {
        code: 88,
      },
    ],

    "import/prefer-default-export": 0,
    "no-unused-vars": "warn",
    "no-console": "off",
    "func-names": "off",
    "no-process-exit": "off",
    "object-shorthand": "off",
    "class-methods-use-this": "off",
    "object-curly-newline": "off",

    "cypress/no-assigning-return-values": "error",
    "cypress/no-unnecessary-waiting": "error",
    "cypress/assertion-before-screenshot": "warn",
    "cypress/no-force": "warn",
    "cypress/no-async-tests": "error",
    "cypress/no-pause": "error",

    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};
