module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: "standard",
  overrides: [
    {
      env: {
        node: true,
        jest: true
      },
      files: [
        ".eslintrc.{js,cjs}"
      ],
      parserOptions: {
        sourceType: "script"
      }
    }
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: [
    "react",
    "jest"
  ],
  rules: {
    quotes: ["error", "double"], // use Always double quotes
    "space-before-function-paren": ["error", "never"], // No Space between function and parentheses
    "react/prop-types": "off",
    "jest/expect-expect": 2
  }
}
