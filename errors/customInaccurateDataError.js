module.exports = class customInaccurateDataError extends Error {
  constructor(errorMessage) {
    super(errorMessage);
    this.statusCode = 400;
  }
};
