import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts'],
  transform: {
    '^.+\\.(tsx|config.js|setup.js)?$': 'babel-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/src/**/*.spec.(js|jsx|ts|tsx)'],
  testURL: 'http://localhost/',
  coverageThreshold: {
    global: {
      lines: 10,
    },
  },
  silent: false,
  clearMocks: true,
};

export default config;
