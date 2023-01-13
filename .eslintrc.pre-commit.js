//Legg inn regler som ikke skal kjøres før commit.

module.exports = {
  extends: [".eslintrc.js"],
  rules: {
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-explicit-any": "off",
  },
};
