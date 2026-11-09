const js = require("@eslint/js");

module.exports = [
  {
    files: ["**/*.js"],
    ignores: ["node_modules/**"],
  },
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        require: "readonly",
        module: "readonly",
        process: "readonly",
        console: "readonly",
        __dirname: "readonly",
      },
      ecmaVersion: "latest",
    },
    rules: {
      "no-unused-vars": [
  "warn",
  {
    argsIgnorePattern: "^_",
  },
],
    },
  },
];