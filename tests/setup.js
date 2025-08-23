// Global test setup
global.console = {
  ...console,
  warn: console.warn,
};

// Create virtual mocks for Wix modules that don't exist locally
jest.mock(
  "wix-fetch",
  () => ({
    fetch: jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            result: {
              latitude: 51.5074,
              longitude: -0.1278,
            },
          }),
      })
    ),
  }),
  { virtual: true }
);

jest.mock(
  "wix-crm-backend",
  () => ({
    triggeredEmails: {
      emailMember: jest.fn(),
      emailContact: jest.fn(),
    },
    contacts: {},
  }),
  { virtual: true }
);
