module.exports = {
  moduleFileExtensions: ["js", "jsx", "json", "vue", "ts", "tsx"],
  transform: {
    "^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
    ".*\\.(vue)$": "<rootDir>/node_modules/vue-jest",
    "^.+\\.ts$": "<rootDir>/node_modules/ts-jest/preprocessor"
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^lodash-es$": "lodash"
  },
  snapshotSerializers: ["jest-serializer-vue"],
  testMatch: [
    "**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)"
  ],
  testURL: "http://localhost/",
  globals: {
    "ts-jest": {
      babelConfig: true
    }
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!lodash-es)"],
  verbose: true
};
