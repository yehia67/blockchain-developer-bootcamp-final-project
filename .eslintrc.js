const OFF = 0;
// const ERROR = 2;

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "jest"],
  ignorePatterns: ["node_modules", "dist", "lib", "coverage", "**/*.d.ts"],
  rules: {
    "react/prop-types": OFF,
    "react/require-default-props": OFF,
    "react/jsx-filename-extension": OFF,
    "react/jsx-props-no-spreading": OFF,
    "no-use-before-define": OFF,
    "@typescript-eslint/no-use-before-define": ["error"],
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        ts: "never",
        tsx: "never",
        jsx: "never",
      },
    ],
  },
  settings: {
    "import/resolver": {
      typescript: {},
      node: {
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
      },
    },
  },
  overrides: [
    {
      files: ["types.ts"],
      rules: {
        "no-unused-vars": OFF,
      },
    },
  ],
  globals: {
    JSX: true,
  },
};
