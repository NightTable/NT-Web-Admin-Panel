module.exports = {
  env: {
    es2021: true,
    browser: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "airbnb",
    "prettier",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "no-console": "off",
    "no-restricted-syntax": [
      "error",
      {
        selector:
          "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]",
        message: "Unexpected property on console object was called",
      },
    ],
    "linebreak-style": ["error", "unix"],
    semi: ["error", "always"],
    quotes: [
      "error",
      "single",
      { avoidEscape: true, allowTemplateLiterals: false },
    ],
    "react/function-component-definition": [
      "error",
      { namedComponents: "arrow-function" },
    ],
    "react/jsx-filename-extension": [2, { allow: "as-needed" }],
    "jsx-quotes": [2, "prefer-single"],
    "object-curly-newline": "off",
    "comma-dangle": ["error", "never"],
    "react/jsx-props-no-spreading": "off",
    "import/prefer-default-export": ["off", { target: "any" }],
    "jsx-a11y/no-noninteractive-element-interactions": 2,
    "jsx-a11y/click-events-have-key-events": 2,
    "jsx-a11y/no-static-element-interactions": 2,
    "react/prop-types": 2,
    "no-use-before-define": 2,
    // 'import/no-unresolved': [2, { ignore: ['/decide/**'] }], // Disable the eslintimport/no-unresolved rule,
    // 'import/no-unresolved': 2, // Disable the eslintimport/no-unresolved rule,
    "import/no-unresolved": [
      2,
      {
        ignore: ["^decide/", "^checkout/", "^host/"], // Ignore paths starting with 'decide/'
      },
    ],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true, // Allow devDependencies
        optionalDependencies: false, // Disallow optionalDependencies
        peerDependencies: false, // Disallow peerDependencies
      },
    ],
    "node/no-dynamic-require": "off",
    "import/order": 2,
  },
  overrides: [
    {
      files: [
        "**/*.spec.js",
        "**/*.spec.jsx",
        "**/*.test.js",
        ".eslintrc.{js,cjs}",
      ],
      env: {
        jest: true,
      },
    },
  ],
  ignorePatterns: ["node_modules/", "**/node_modules/", "/**/node_modules/*"],
  settings: {},
};

// step 3 : add. .prettierrc file in the main folder
// step 4 : run this cmd 'npx eslint .eslintrc.js'
