import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
    rules: {
      // 'react/no-unescaped-entities': 'off',
    //   '@typescript-eslint/ban-ts-comment': 'off',
    //   'react-hooks/exhaustive-deps': 'warn',
     },
  }),
];

export default eslintConfig;