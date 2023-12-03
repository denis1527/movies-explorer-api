module.exports = class customForbiddenError extends Error {
  constructor(errorMessage) {
    super(errorMessage);
    this.statusCode = 403;
  }
};
