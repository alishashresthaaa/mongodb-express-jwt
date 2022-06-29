// Custom Class to initialise the error object with message and status code
// Extends the default error class from node

class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = CustomAPIError;
