const detox = require('detox');
const adapter = require('detox/runners/jest/adapter');
const config = require('../detox.config');

jest.setTimeout(120000);

beforeAll(async () => {
  await detox.init(config);
});

beforeEach(async () => {
  await adapter.beforeEach();
});

afterAll(async () => {
  await detox.cleanup();
});
