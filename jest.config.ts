import { defaults } from 'jest-config'

module.exports = {
  testEnvironment: 'node',
  testMatch: [...defaults.testMatch, '**/__tests__/**/*.test.js'],
  moduleFileExtensions: ['js'],
  collectCoverageFrom: ['src/**/*.js'],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text'],
}