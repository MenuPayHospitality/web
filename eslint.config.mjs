import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// eslint-disable-next-line react/no-unescaped-entities

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-explicit-any": "off",
      'react-hooks/exhaustive-deps': 'warn', // This is already a warning, but you can set to 'error'
      'prefer-const': 'error',
    },
    plugins: [
      // Your existing plugins...
      'react-hooks',
      '@typescript-eslint',
    ],
    extends: [
      // Your existing extends...
      'plugin:react-hooks/recommended',
      'plugin:@typescript-eslint/recommended',
    ],
  }
];

export default eslintConfig;