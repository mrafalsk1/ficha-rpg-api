import type { Config } from 'jest'

export default async (): Promise<Config> => {
  return {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/**/*.test.ts"],
    verbose: true,
    forceExit: true,
    clearMocks: true,
    resetMocks: true,
    restoreMocks: true,
    rootDir: './src',

  }
}