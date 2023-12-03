module.exports = class customNotFoundError extends Error {
  constructor(errorMessage) {
    super(errorMessage);
    this.statusCode = 404;
  }
};
