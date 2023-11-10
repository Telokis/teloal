module.exports = {
  extends: "@loopback/eslint-config",
  rules: {
    "array-bracket-spacing": ["error", "never"],
    "object-curly-spacing": ["error", "always"],
    curly: "error",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/unified-signatures": "off",
    "@typescript-eslint/naming-convention": "off",
  },
  parserOptions: {
    project: ["**/tsconfig.json", "**/tsconfig.*.json"],
  },
};
