module.exports = class customConflictError extends Error {
  constructor(errorMessage) {
    super(errorMessage);
    this.statusCode = 409;
  }
};
