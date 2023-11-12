module.exports = class customUnauthorizedError extends Error {
  constructor(errorMessage) {
    super(errorMessage);
    this.statusCode = 401;
  }
};
