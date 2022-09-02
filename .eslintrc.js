module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "airbnb-base",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint",
  ],
  ignorePatterns: ["build/"],
  rules: {
    // TODO
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "no-use-before-define": "off",
    quotes: ["error", "double"],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "error",
  },
};
