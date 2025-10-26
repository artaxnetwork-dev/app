const eslintConfig = [
  {
    ignores: [
    ".next/**",
    "out/**",
    "build/**",
      "dist/**",
    "next-env.d.ts",
      "node_modules/**",
      ".vercel/**",
      "*.config.js",
      "*.config.mjs"
    ]
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    rules: {
      // Basic rules for Next.js projects
      "no-unused-vars": "warn",
      "no-console": "warn",
      "prefer-const": "warn",
      "no-var": "error"
    }
  }
];

export default eslintConfig;
