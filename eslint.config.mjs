// eslint.config.js
import js from "@eslint/js";
import ts from "typescript-eslint";
import prettier from "eslint-config-prettier";

export default ts.config(
  js.configs.recommended,
  ...ts.configs.recommended,
  prettier,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: ts.parser,
      parserOptions: { project: "./tsconfig.json" },
    },
    ignores: ["dist", "node_modules"],
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  }
);
