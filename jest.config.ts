import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@env/(.*)$': '<rootDir>/src/env/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@db/(.*)$': '<rootDir>/src/db/$1',
    '^@interfaces/(.*)$': '<rootDir>/src/interfaces/$1',
    '^@middlewares/(.*)$': '<rootDir>/src/middlewares/$1',
  },
};

export default config;
