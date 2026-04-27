// eslint.config.mjs
import js from "@eslint/js";
import next from "eslint-config-next";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,

  ...tseslint.configs.recommended,

  ...next(),

  {
    rules: {
      // Production-friendly
      "no-console": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" }
      ],

      // React 18 + Next
      "react/react-in-jsx-scope": "off",
    },
  },
];
