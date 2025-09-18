module.exports = {
  Client: jest.fn(() => ({
    pages: {
      create: jest.fn(),
    },
  })),
};