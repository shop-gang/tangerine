module.exports = {
  overrides: [
    {
      files: ["jest.config.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
        "import/no-commonjs": "off",
        "import/no-extraneous-dependencies": "off",
      },
    },
  ],
};
