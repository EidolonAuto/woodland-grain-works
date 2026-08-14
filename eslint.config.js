import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: ["js/vendor/**"],
  },
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.nodeBuiltin,
      },
    },
    rules: {
      "no-console": "warn",
    },
  },
];
