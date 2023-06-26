const config = {
  globalSetup: './test-utils/global-setup.ts',
  globalTeardown: './test-utils/global-teardown.ts',
  clearMocks: true,
  testTimeout: 1500,
  testEnvironment: 'node',
  preset: 'ts-jest',
}

export default config
